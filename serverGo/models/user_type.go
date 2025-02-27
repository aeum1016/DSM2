package models

type User struct {
	Username string   `bson:"username"`
	Email    string   `bson:"email"`
	Password string   `bson:"password"`
	Friends  []string `bson:"friends"`
	Requests []string `bson:"requests"`
}
