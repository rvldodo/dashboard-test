CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_time" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_time" timestamp with time zone DEFAULT now() NOT NULL
);
