import json
import os
import psycopg2
from typing import Dict, Any, Optional

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение списка товаров или конкретного товара
    Args: event - запрос с httpMethod, queryStringParameters
          context - контекст выполнения функции
    Returns: JSON с товарами
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    product_id: Optional[str] = params.get('id')
    category: Optional[str] = params.get('category')
    in_stock_only: bool = params.get('inStock', 'true').lower() == 'true'
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database connection not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        if product_id:
            cur.execute(
                "SELECT id, name, category, description, price, image, ingredients, "
                "calories, protein, fats, carbs, portion_size, allergens, sweetener, tags, "
                "in_stock, is_popular FROM products WHERE id = %s",
                (product_id,)
            )
            row = cur.fetchone()
            
            if not row:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product not found'}),
                    'isBase64Encoded': False
                }
            
            product = {
                'id': row[0],
                'name': row[1],
                'category': row[2],
                'description': row[3],
                'price': row[4],
                'image': row[5],
                'ingredients': row[6],
                'nutrition': {
                    'calories': row[7],
                    'protein': row[8],
                    'fats': row[9],
                    'carbs': row[10],
                    'portionSize': row[11]
                },
                'allergens': row[12].split(', ') if row[12] else [],
                'sweetener': row[13],
                'tags': row[14].split(', ') if row[14] else [],
                'inStock': row[15],
                'isPopular': row[16]
            }
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(product),
                'isBase64Encoded': False
            }
        
        query = (
            "SELECT id, name, category, description, price, image, ingredients, "
            "calories, protein, fats, carbs, portion_size, allergens, sweetener, tags, "
            "in_stock, is_popular FROM products WHERE 1=1"
        )
        params_list = []
        
        if in_stock_only:
            query += " AND in_stock = TRUE"
        
        if category:
            query += " AND category = %s"
            params_list.append(category)
        
        query += " ORDER BY is_popular DESC, name ASC"
        
        cur.execute(query, params_list)
        rows = cur.fetchall()
        
        products = []
        for row in rows:
            products.append({
                'id': row[0],
                'name': row[1],
                'category': row[2],
                'description': row[3],
                'price': row[4],
                'image': row[5],
                'ingredients': row[6],
                'nutrition': {
                    'calories': row[7],
                    'protein': row[8],
                    'fats': row[9],
                    'carbs': row[10],
                    'portionSize': row[11]
                },
                'allergens': row[12].split(', ') if row[12] else [],
                'sweetener': row[13],
                'tags': row[14].split(', ') if row[14] else [],
                'inStock': row[15],
                'isPopular': row[16]
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(products),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
