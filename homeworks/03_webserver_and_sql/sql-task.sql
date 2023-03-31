/*
TASK 1:
Write an SQL statement to define tables for the next entities:

Concerts (name, duration, description, address, age limit, price)
Visitors (email, name, age)
Categories (name, description).
Notes:

One concert may be related to different categories.
*/

CREATE TABLE Concerts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  duration TIME NOT NULL,
  description TEXT,
  address VARCHAR(255) NOT NULL,
  age_limit INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

CREATE TABLE Visitors (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL
);

CREATE TABLE Categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE ConcertCategories (
  concert_id INTEGER REFERENCES Concerts(id),
  category_id INTEGER REFERENCES Categories(id),
  PRIMARY KEY (concert_id, category_id)
);

/*
TASK 2:
Select all users with theirs channels and return next information, 
sorted by channel's creation date (newer at the top):

user id, user name, user avatar, channel photo, channel description, channel creation date.
*/
SELECT 
  users.id AS user_id, 
  users.name AS user_name, 
  users.avatar AS user_avatar, 
  channels.photo AS channel_photo, 
  channels.description AS channel_description, 
  channels.created_at AS channel_creation_date 
FROM 
  users 
  JOIN channels ON users.id = channels.user_id 
ORDER BY 
  channels.created_at DESC;


/*
TASK 3:
Select information about 5 the most liked videos ever.

Imagen that we have table for videos with field: id, title, description, watches and date of creation
*/

SELECT 
  id, 
  title, 
  description, 
  watches, 
  created_at 
FROM 
  videos 
ORDER BY 
  watches DESC 
LIMIT 5;

/*
TASK 4:
Select videos from subscriptions for user Stephanie Bulger, 
ordered by publish date (newer at the top) and return next information:

video id, video title, video preview, video duration, video publish date.

I used JOIN to combine the users, subscriptions,
and videos tables based on the user_id and channel_id foreign key constraints.
*/

SELECT 
  videos.id AS video_id, 
  videos.title AS video_title, 
  videos.preview AS video_preview, 
  videos.duration AS video_duration, 
  videos.publish_date AS video_publish_date 
FROM 
  users 
  JOIN subscriptions ON users.id = subscriptions.user_id 
  JOIN videos ON subscriptions.channel_id = videos.channel_id 
WHERE 
  users.name = 'Stephanie Bulger' 
ORDER BY 
  videos.publish_date DESC;

/*
TASK 5:
Select information of channel with id '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76'
and count of its subscribers.

I used LEFT JOIN statement to combine the channels and 
subscriptions tables based on the channel_id foreign key constraint. 
*/
SELECT 
  channels.id, 
  channels.name, 
  channels.description, 
  channels.created_at, 
  COUNT(subscriptions.user_id) AS subscriber_count 
FROM 
  channels 
  LEFT JOIN subscriptions ON channels.id = subscriptions.channel_id 
WHERE 
  channels.id = '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76';

/*
TASK 6:
Select the most rated (likes and dislikes) top 10 videos starting from the September
which has more than 4 likes, sorted by count of likes (the most at the top).
*/

SELECT 
  id, 
  title, 
  description, 
  likes, 
  dislikes, 
  created_at 
FROM 
  videos 
WHERE 
  likes > 4 
  AND created_at >= '2022-09-01' 
ORDER BY 
  likes DESC 
LIMIT 10;

/*
TASK 7:
Select subscriptions for user Ennis Haestier and return next information:

channel (user) name, channel (user) avatar, channel photo, 
channel description, subscription level, subscription date.

Information should be sorted firstly by subscription level and 
secondly by subscription date:

order for subscription levels from top to bottom: vip, follower, 
fan, standard; subscription date from newer to older.

I used INNER JOIN statements to combine the subscriptions, 
channels, and users tables based on the foreign key constraints.
Also The CASE statement in the ORDER BY clause assigns a numerical 
value to each subscription level for sorting.
*/

SELECT 
  channels.name AS channel_name, 
  channels.avatar AS channel_avatar, 
  channels.photo, 
  channels.description, 
  subscriptions.level, 
  subscriptions.created_at AS subscription_date 
FROM 
  subscriptions 
  INNER JOIN channels ON subscriptions.channel_id = channels.id 
  INNER JOIN users ON channels.user_id = users.id 
WHERE 
  users.name = 'Ennis Haestier' 
ORDER BY 
  CASE 
    subscriptions.level 
    WHEN 'vip' THEN 1 
    WHEN 'follower' THEN 2 
    WHEN 'fan' THEN 3 
    WHEN 'standard' THEN 4 
  END ASC, 
  subscriptions.created_at DESC;



