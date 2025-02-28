package models

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	Client *mongo.Client
	DB *mongo.Database
)

func DBConnection(ctx context.Context) *mongo.Database {
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Println("Set your 'MONGODB_URI' environment variable.")
	}

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	DB = client.Database("DSM2")

	log.Println("Connection establish to database ", DB.Name())

	return DB
}

func Close() {
	if err := Client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}
}


