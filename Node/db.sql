-- Drop table

-- DROP TABLE postdb.post

CREATE TABLE postdb.post (
	post_id bigserial DEFAULT nextval('postdb.post_post_id_seq'::regclass) NOT NULL,
	post_desc text(2147483647),
	title text(2147483647),
	postdata text(2147483647),
	datetime timestamp DEFAULT now(),
	createdby text(2147483647),
	banner text(2147483647),
	poster_avatar text(2147483647),
	likes int8,
	dislikes int8
) ;
