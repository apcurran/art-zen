CREATE TABLE app_user(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    bio_description VARCHAR,
    avatar_img_url VARCHAR
);

CREATE TABLE artwork(
    artwork_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES app_user(user_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    genre VARCHAR(20) NOT NULL,
    img_url VARCHAR NOT NULL,
    img_width INT NOT NULL,
    img_height INT NOT NULL,
    img_alt_txt VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE follower(
    follower_user_id INT NOT NULL,
    FOREIGN KEY(follower_user_id) REFERENCES app_user(user_id) ON DELETE CASCADE,
    account_user_id INT NOT NULL,
    FOREIGN KEY(account_user_id) REFERENCES app_user(user_id) ON DELETE CASCADE
);

CREATE TABLE artwork_like(
    like_id SERIAL PRIMARY KEY,
    artwork_id INT NOT NULL,
    FOREIGN KEY(artwork_id) REFERENCES artwork(artwork_id) ON DELETE CASCADE,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES app_user(user_id) ON DELETE CASCADE
);

CREATE TABLE artwork_comment(
    comment_id SERIAL PRIMARY KEY,
    artwork_id INT NOT NULL,
    FOREIGN KEY(artwork_id) REFERENCES artwork(artwork_id) ON DELETE CASCADE,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES app_user(user_id) ON DELETE CASCADE,
    text VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE artwork_favorite(
    favorite_id SERIAL PRIMARY KEY,
    artwork_id INT NOT NULL,
    FOREIGN KEY(artwork_id) REFERENCES artwork(artwork_id) ON DELETE CASCADE,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES app_user(user_id) ON DELETE CASCADE
);