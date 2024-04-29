import json
import os
from azure.cosmos.aio import CosmosClient
# from azure.cosmos import exceptions
from azure.cosmos.partition_key import PartitionKey
# import asyncio
import azure.functions as func
from fastapi import FastAPI, Request, Response
import logging
from dotenv import load_dotenv

load_dotenv()

COSMOSDB_ENDPOINT = os.environ.get("COSMOSDB_ENDPOINT")
COSMOSDB_CONNECTION_KEY = os.environ.get("COSMOSDB_CONNECTION_KEY")
COSMOSDB_DATABASE = os.environ.get("COSMOSDB_DATABASE")


# Replace these values with your Cosmos DB connection information
endpoint = COSMOSDB_ENDPOINT
key = COSMOSDB_CONNECTION_KEY
database_id = COSMOSDB_DATABASE
container_id = "Items"
partition_key = "/ProjectId"

# Set the total throughput (RU/s) for the database and container
# database_throughput = 1000

fast_app = FastAPI()

# Singleton CosmosClient instance
client = CosmosClient(endpoint, credential=key)

# Helper function to get or create database and container
async def get_or_create_container(client, database_id, container_id, partition_key):
  database = await client.create_database_if_not_exists(id=database_id)
  print(f'Database "{database_id}" created or retrieved successfully.')

  container = await database.create_container_if_not_exists(id=container_id, partition_key=PartitionKey(path=partition_key))
  print(f'Container with id "{container_id}" created')

  return container
 
# async def create_products():
#   container = await get_or_create_container(client, database_id, container_id, partition_key)
#   for i in range(10):
#     await container.upsert_item({
#       'id': f'item{i}',
#       'productName': 'Widget',
#       'productModel': f'Model {i}'
#     })
 
async def get_products():
  items = []
  container = await get_or_create_container(client, database_id, container_id, partition_key)
  async for item in container.read_all_items():
    items.append(item)
  return items

# async def query_products(product_name):
#   container = await get_or_create_container(client, database_id, container_id, partition_key)
#   query = f"SELECT * FROM c WHERE c.productName = '{product_name}'"
#   items = []
#   async for item in container.query_items(query=query, enable_cross_partition_query=True):
#     items.append(item)
#   return items

@fast_app.get("/items")
async def GetItems(req: Request) -> Response:
    logging.info("Python HTTP trigger function processed a request.")

    # name = req.params.get("name")
    # if not name:
    #     try:
    #         req_body = req.get_json()
    #     except ValueError:
    #         pass
    #     else:
    #         name = req_body.get("name")
    
    all_products = await get_products()
    print('All Products:', all_products)

    return Response(
      content=json.dumps(all_products),
      status_code=200,
      headers={"content-type": "application/json"},
    )

app = func.AsgiFunctionApp(app=fast_app, http_auth_level=func.AuthLevel.ANONYMOUS)

