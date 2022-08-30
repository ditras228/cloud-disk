CREATE TABLE public.users
(
    id SERIAL unique,
    email     VARCHAR(255),
    password  VARCHAR(255),
    disk_space INTEGER DEFAULT (1024 * 3 * 10),
    used_space INTEGER DEFAULT 0,
    avatar VARCHAR(255),
    activated_at  DATE NOT NULL DEFAULT CURRENT_DATE,
    hash VARCHAR(255)
);

CREATE TABLE public.files
(
    id SERIAL,
    name VARCHAR(255),
    type  VARCHAR(255),
    access_Link VARCHAR(255),
    size INTEGER DEFAULT 0,
    path VARCHAR(255),
    user_id INTEGER UNIQUE REFERENCES public.users(id),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    parent INTEGER DEFAULT NULL,
    is_share BOOLEAN
)


INSERT INTO public.users(email, password, avatar, hash) VALUES ('misteranonimus555@gmail.com', 'test', 'test', 'test2')
