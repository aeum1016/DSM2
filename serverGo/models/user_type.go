package models

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type User struct {
	UserID bson.ObjectID   `bson:"_id"`
	Email    string
	Username string
	Password string
	Friends  []bson.ObjectID
	Requests []bson.ObjectID
}

func FindOneUser(filter bson.D) (User, error) {
	var result User
	err := UsersCollection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Println("Could not find user with filter:", filter)
	}

	return result, nil
}