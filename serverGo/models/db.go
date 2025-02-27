package models

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var ( 
	db *mongo.Database
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

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	db = client.Database("DSM2")

	log.Println("Connection establish to database ", db.Name())

	return db
}


