package models

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Attempt struct {
	AttemptID bson.ObjectID `bson:"_id"`
	UserID    bson.ObjectID `bson:"userId"`
	Setting   string
	Completed int32
	Incorrect int32
	Time      int32
	CreatedAt time.Time `bson:"createdAt"`
}

type LeaderboardAttempt struct {
	UserID    bson.ObjectID `bson:"_id"`
	Completed int32
	Time      int32
	CreatedAt time.Time `bson:"createdAt"`
}

func CreateAttempt(att Attempt) error {
	_, err := AttemptsCollection.InsertOne(context.TODO(), att)
	if err != nil {
		return fmt.Errorf("failed to create attempt %s", err)
	}
	return nil
}

func GetLeaderboardAttemptsByTime(filter bson.D) ([]LeaderboardAttempt, error) {
	attempts := AttemptsCollection

	pipeline := bson.A{
		bson.D{{"$match", filter}},
		bson.D{{"$sort", bson.D{{"time", 1}}}},
		bson.D{
			{"$group",
				bson.D{
					{"_id", "$userId"},
					{"time", bson.D{{"$first", "$time"}}},
					{"completed", bson.D{{"$first", "$completed"}}},
					{"createdAt", bson.D{{"$first", "$createdAt"}}},
				},
			},
		},
		bson.D{{"$sort", bson.D{{"time", 1}}}},
	}

	cur, err := attempts.Aggregate(context.TODO(), pipeline)

	if err != nil {
		return nil, fmt.Errorf("failed to get leaderboard attempts with error %s", err)
	}

	var results []LeaderboardAttempt
	if err = cur.All(context.TODO(), &results); err != nil {
		return nil, fmt.Errorf("failed to get leaderboard attempts with error %s", err)
	}

	return results, nil
}

func GetLeaderboardAttemptsByCompleted(filter bson.D) ([]LeaderboardAttempt, error) {
	attempts := AttemptsCollection

	pipeline := bson.A{
		bson.D{{"$match", filter}},
		bson.D{{"$sort", bson.D{{"completed", -1}}}},
		bson.D{
			{"$group",
				bson.D{
					{"_id", "$userId"},
					{"time", bson.D{{"$first", "$time"}}},
					{"completed", bson.D{{"$first", "$completed"}}},
					{"createdAt", bson.D{{"$first", "$createdAt"}}},
				},
			},
		},
		bson.D{{"$sort", bson.D{{"completed", -1}}}},
	}

	cur, err := attempts.Aggregate(context.TODO(), pipeline)

	if err != nil {
		return nil, fmt.Errorf("failed to get leaderboard attempts with error %s", err)
	}

	var results []LeaderboardAttempt
	if err = cur.All(context.TODO(), &results); err != nil {
		return nil, fmt.Errorf("failed to get leaderboard attempts with error %s", err)
	}

	return results, nil
}

func FindAttempts(filter bson.D, opts *options.FindOptionsBuilder) ([]Attempt, error) {
	attempts := AttemptsCollection

	cur, err := attempts.Find(context.TODO(), filter, opts)
	if err != nil {
		return nil, fmt.Errorf("failed to get attempts with error %s", err)
	}

	var results []Attempt

	err = cur.All(context.TODO(), &results)
	if err != nil {
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
