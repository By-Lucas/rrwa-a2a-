from google.cloud import pubsub_v1
import json
import os

PROJECT_ID = os.getenv("GCP_PROJECT_ID")

def publish_message(topic_name, data):
    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path(PROJECT_ID, topic_name)
    future = publisher.publish(topic_path, json.dumps(data).encode("utf-8"))
    return future.result()

def subscribe_message(subscription_name, callback):
    subscriber = pubsub_v1.SubscriberClient()
    subscription_path = subscriber.subscription_path(PROJECT_ID, subscription_name)
    subscriber.subscribe(subscription_path, callback=callback)
    print("Subscribed and listening...")

# Exemplo de uso:
# def process_message(message):
#     data = json.loads(message.data)
#     ... faça algo com data ...
#     message.ack()
