package models

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type Attempt struct {
	AttemptID    bson.ObjectID 		`bson:"_id"`
	UserID    bson.ObjectID 		`bson:"userId"`
	Setting   string
	Completed int32
	Incorrect int32
	Time      int32
	CreatedAt time.Time `bson:"createdAt"`
}

func FindOneAttempt(filter bson.D) (Attempt, error) {
	var result Attempt
	err := AttemptsCollection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Println("Could not find attempt with filter:", filter)
	}

	return result, nil
}