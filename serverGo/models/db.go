package models

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var (
	Client *mongo.Client
	DB *mongo.Database
	UsersCollection *mongo.Collection
	AttemptsCollection *mongo.Collection
)

func DBConnection(ctx context.Context) *mongo.Database {
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Println("Set your 'MONGODB_URI' environment variable.")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	DB = client.Database("DSM2")

	var pingResult bson.M
	if err := DB.RunCommand(context.TODO(), bson.D{{"ping", 1}}).Decode(&pingResult); err != nil {
		panic(err)
	}

	UsersCollection = DB.Collection("users")
	AttemptsCollection = DB.Collection("attempts")

	log.Println("Connection establish to database", DB.Name())

	return DB
}

func Close() {
	if err := Client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}
}
