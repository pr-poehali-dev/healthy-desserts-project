import json
import os
import psycopg2
from typing import Dict, Any

SAMPLE_PRODUCTS = [
    {
        'id': '1', 'name': 'Черничный чизкейк', 'category': 'desserts',
        'description': 'Нежный творожный десерт с черникой на овсяной основе',
        'price': 350, 'image': 'https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/f1055de5-4d98-4179-8918-07e452860055.jpg',
        'ingredients': 'Творог обезжиренный, овсяные хлопья, черника свежая, яйца, греческий йогурт, эритрит, ванилин',
        'calories': 180, 'protein': 18, 'fats': 5, 'carbs': 15, 'portion_size': '150 г',
        'allergens': 'Яйца, Молочные продукты, Глютен', 'sweetener': 'erythritol',
        'tags': 'high-protein, no-added-sugar', 'in_stock': True, 'is_popular': True
    },
    {
        'id': '2', 'name': 'Шоколадный брауни', 'category': 'desserts',
        'description': 'Влажный брауни из цельнозерновой муки с горьким шоколадом',
        'price': 320, 'image': 'https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/8348df95-6912-44bb-bc32-8baed1990336.jpg',
        'ingredients': 'Цельнозерновая мука, какао-порошок, горький шоколад 80%, яйца, стевия, кокосовое масло',
        'calories': 220, 'protein': 8, 'fats': 12, 'carbs': 20, 'portion_size': '100 г',
        'allergens': 'Яйца, Глютен', 'sweetener': 'stevia',
        'tags': 'no-added-sugar', 'in_stock': True, 'is_popular': True
    },
    {
        'id': '3', 'name': 'Ягодный тарт', 'category': 'desserts',
        'description': 'Хрустящее тесто с кремом из греческого йогурта и свежими ягодами',
        'price': 380, 'image': 'https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/cbfb7939-978a-4ed4-8e6c-f1cfda53c5a6.jpg',
        'ingredients': 'Миндальная мука, греческий йогурт, свежая малина, голубика, эритрит, яйца, сливочное масло',
        'calories': 195, 'protein': 12, 'fats': 9, 'carbs': 16, 'portion_size': '120 г',
        'allergens': 'Орехи, Молочные продукты, Яйца', 'sweetener': 'erythritol',
        'tags': 'high-protein, no-added-sugar', 'in_stock': True, 'is_popular': True
    },
    {
        'id': '4', 'name': 'Морковный кекс', 'category': 'desserts',
        'description': 'Ароматный кекс с морковью, орехами и корицей',
        'price': 290, 'image': 'https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/f1055de5-4d98-4179-8918-07e452860055.jpg',
        'ingredients': 'Морковь свежая, овсяная мука, грецкие орехи, яйца, кокосовое масло, корица, стевия',
        'calories': 210, 'protein': 7, 'fats': 11, 'carbs': 21, 'portion_size': '110 г',
        'allergens': 'Орехи, Яйца, Глютен', 'sweetener': 'stevia',
        'tags': 'no-added-sugar', 'in_stock': True, 'is_popular': False
    },
    {
        'id': '5', 'name': 'Капучино', 'category': 'drinks',
        'description': 'Классический капучино на миндальном молоке',
        'price': 220, 'image': 'https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/f1055de5-4d98-4179-8918-07e452860055.jpg',
        'ingredients': 'Эспрессо, миндальное молоко',
        'calories': 95, 'protein': 3, 'fats': 4, 'carbs': 10, 'portion_size': '300 мл',
        'allergens': 'Орехи', 'sweetener': 'none',
        'tags': 'lactose-free, vegan', 'in_stock': True, 'is_popular': False
    },
    {
        'id': '6', 'name': 'Латте с овсяным молоком', 'category': 'drinks',
        'description': 'Нежный латте на овсяном молоке без сахара',
        'price': 240, 'image': 'https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/8348df95-6912-44bb-bc32-8baed1990336.jpg',
        'ingredients': 'Эспрессо, овсяное молоко',
        'calories': 110, 'protein': 4, 'fats': 4, 'carbs': 14, 'portion_size': '350 мл',
        'allergens': 'Глютен', 'sweetener': 'none',
        'tags': 'lactose-free, vegan', 'in_stock': True, 'is_popular': True
    },
    {
        'id': '7', 'name': 'Матча-латте', 'category': 'drinks',
        'description': 'Японский зеленый чай матча с кокосовым молоком',
        'price': 280, 'image': 'https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/cbfb7939-978a-4ed4-8e6c-f1cfda53c5a6.jpg',
        'ingredients': 'Чай матча, кокосовое молоко, стевия',
        'calories': 120, 'protein': 2, 'fats': 6, 'carbs': 12, 'portion_size': '300 мл',
        'allergens': '', 'sweetener': 'stevia',
        'tags': 'lactose-free, vegan, no-added-sugar', 'in_stock': True, 'is_popular': False
    },
    {
        'id': '8', 'name': 'Комбо "Утренний заряд"', 'category': 'combo',
        'description': 'Капучино + Черничный чизкейк',
        'price': 520, 'image': 'https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/f1055de5-4d98-4179-8918-07e452860055.jpg',
        'ingredients': 'См. состав капучино и черничного чизкейка',
        'calories': 275, 'protein': 21, 'fats': 9, 'carbs': 25, 'portion_size': 'Комбо',
        'allergens': 'Орехи, Яйца, Молочные продукты, Глютен', 'sweetener': 'erythritol',
        'tags': 'high-protein, no-added-sugar', 'in_stock': True, 'is_popular': True
    },
    {
        'id': '9', 'name': 'Комбо "Шоколадное удовольствие"', 'category': 'combo',
        'description': 'Латте + Шоколадный брауни',
        'price': 510, 'image': 'https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/8348df95-6912-44bb-bc32-8baed1990336.jpg',
        'ingredients': 'См. состав латте и шоколадного брауни',
        'calories': 330, 'protein': 12, 'fats': 16, 'carbs': 34, 'portion_size': 'Комбо',
        'allergens': 'Глютен, Яйца', 'sweetener': 'stevia',
        'tags': 'lactose-free, vegan, no-added-sugar', 'in_stock': True, 'is_popular': False
    },
    {
        'id': '10', 'name': 'Тыквенный латте', 'category': 'seasonal',
        'description': 'Сезонный напиток с тыквенным пюре и специями',
        'price': 260, 'image': 'https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/cbfb7939-978a-4ed4-8e6c-f1cfda53c5a6.jpg',
        'ingredients': 'Эспрессо, овсяное молоко, тыквенное пюре, корица, имбирь, мускатный орех, эритрит',
        'calories': 140, 'protein': 5, 'fats': 5, 'carbs': 18, 'portion_size': '350 мл',
        'allergens': 'Глютен', 'sweetener': 'erythritol',
        'tags': 'lactose-free, vegan, no-added-sugar', 'in_stock': True, 'is_popular': True
    }
]

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Инициализация базы данных начальными товарами
    Args: event - запрос с httpMethod
          context - контекст выполнения
    Returns: результат инициализации
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
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
        
        for product in SAMPLE_PRODUCTS:
            cur.execute(
                "INSERT INTO products (id, name, category, description, price, image, ingredients, "
                "calories, protein, fats, carbs, portion_size, allergens, sweetener, tags, in_stock, is_popular) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) "
                "ON CONFLICT (id) DO NOTHING",
                (product['id'], product['name'], product['category'], product['description'],
                 product['price'], product['image'], product['ingredients'],
                 product['calories'], product['protein'], product['fats'], product['carbs'],
                 product['portion_size'], product['allergens'], product['sweetener'],
                 product['tags'], product['in_stock'], product['is_popular'])
            )
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': f'{len(SAMPLE_PRODUCTS)} products initialized successfully'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
