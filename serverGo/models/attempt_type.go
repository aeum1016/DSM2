package models

import "time"

type Attempt struct {
	UserID    string 		`bson:"uid"`
	Setting   string 		`bson:"setting"`
	Completed int32  		`bson:"completed"`
	Incorrect int32  		`bson:"incorrect"`
	Time      int32  		`bson:"time"`
	CreatedAt time.Time `bson:"created_at"`
}
