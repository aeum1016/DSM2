package models

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
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

func CreateAttempt(att Attempt) error {
	_, err := AttemptsCollection.InsertOne(context.TODO(), att); if err != nil {
		return fmt.Errorf("failed to create attempt %s", err)
	}
	return nil
}

func FindAttempts(filter bson.D, opts *options.FindOptionsBuilder) ([]Attempt, error) {
	attempts := AttemptsCollection
	
	cur, err := attempts.Find(context.TODO(), filter, opts); if err != nil {
		return nil, fmt.Errorf("failed to get attempts with error %s", err)
	}
	
	var results []Attempt

	err = cur.All(context.TODO(), &results); if err != nil {
		return nil, fmt.Errorf("failed to get decode attempts with error %s", err)
	}

	return results, nil
}

func FindOneAttempt(filter bson.D) (Attempt, error) {
	var result Attempt
	err := AttemptsCollection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return Attempt{}, fmt.Errorf("could not find attempt with filter:%s", filter)
	}

	return result, nil
}