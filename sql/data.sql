--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Dictionary; Type: TABLE; Schema: public; Owner: dictionaries
--

CREATE TABLE public."Dictionary" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    code character varying(100),
    name character varying(255),
    "begDate" date,
    "endDate" date,
    "parentId" integer
);


ALTER TABLE public."Dictionary" OWNER TO dictionaries;

--
-- Name: DictionaryRow; Type: TABLE; Schema: public; Owner: dictionaries
--

CREATE TABLE public."DictionaryRow" (
    id integer NOT NULL,
    date date,
    data jsonb,
    "dictionaryId" integer
);


ALTER TABLE public."DictionaryRow" OWNER TO dictionaries;

--
-- Name: DictionaryRow_id_seq; Type: SEQUENCE; Schema: public; Owner: dictionaries
--

CREATE SEQUENCE public."DictionaryRow_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DictionaryRow_id_seq" OWNER TO dictionaries;

--
-- Name: DictionaryRow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dictionaries
--

ALTER SEQUENCE public."DictionaryRow_id_seq" OWNED BY public."DictionaryRow".id;


--
-- Name: Dictionary_id_seq; Type: SEQUENCE; Schema: public; Owner: dictionaries
--

CREATE SEQUENCE public."Dictionary_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Dictionary_id_seq" OWNER TO dictionaries;

--
-- Name: Dictionary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dictionaries
--

ALTER SEQUENCE public."Dictionary_id_seq" OWNED BY public."Dictionary".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: dictionaries
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO dictionaries;

--
-- Name: Dictionary id; Type: DEFAULT; Schema: public; Owner: dictionaries
--

ALTER TABLE ONLY public."Dictionary" ALTER COLUMN id SET DEFAULT nextval('public."Dictionary_id_seq"'::regclass);


--
-- Name: DictionaryRow id; Type: DEFAULT; Schema: public; Owner: dictionaries
--

ALTER TABLE ONLY public."DictionaryRow" ALTER COLUMN id SET DEFAULT nextval('public."DictionaryRow_id_seq"'::regclass);


--
-- Data for Name: Dictionary; Type: TABLE DATA; Schema: public; Owner: dictionaries
--

COPY public."Dictionary" (id, "createdAt", "updatedAt", code, name, "begDate", "endDate", "parentId") FROM stdin;
1	2021-10-04 17:43:59.091	\N	DICTIONARY	Общесистемные справочники	\N	\N	\N
2	2021-10-04 17:43:59.091	\N	CBRKEYRATE	Ключевая ставка ЦБ РФ	2018-04-27	\N	1
\.


--
-- Data for Name: DictionaryRow; Type: TABLE DATA; Schema: public; Owner: dictionaries
--

COPY public."DictionaryRow" (id, date, data, "dictionaryId") FROM stdin;
3	2022-02-28	0.2	2
6	2022-04-11	0.17	2
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: dictionaries
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ed81f898-d43e-413b-a670-2b1b6d533306	655ed26d1d298cacc915911556278aaf9095b0c8616cc0567dad6018a4c2f966	2021-10-05 11:53:45.41236+04	20211005075345_init	\N	\N	2021-10-05 11:53:45.39293+04	1
\.


--
-- Name: DictionaryRow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dictionaries
--

SELECT pg_catalog.setval('public."DictionaryRow_id_seq"', 6, true);


--
-- Name: Dictionary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dictionaries
--

SELECT pg_catalog.setval('public."Dictionary_id_seq"', 1, false);


--
-- Name: DictionaryRow DictionaryRow_pkey; Type: CONSTRAINT; Schema: public; Owner: dictionaries
--

ALTER TABLE ONLY public."DictionaryRow"
    ADD CONSTRAINT "DictionaryRow_pkey" PRIMARY KEY (id);


--
-- Name: Dictionary Dictionary_pkey; Type: CONSTRAINT; Schema: public; Owner: dictionaries
--

ALTER TABLE ONLY public."Dictionary"
    ADD CONSTRAINT "Dictionary_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: dictionaries
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Dictionary_parentId_code_name_key; Type: INDEX; Schema: public; Owner: dictionaries
--

CREATE UNIQUE INDEX "Dictionary_parentId_code_name_key" ON public."Dictionary" USING btree ("parentId", code, name);


--
-- Name: DictionaryRow DictionaryRow_dictionaryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dictionaries
--

ALTER TABLE ONLY public."DictionaryRow"
    ADD CONSTRAINT "DictionaryRow_dictionaryId_fkey" FOREIGN KEY ("dictionaryId") REFERENCES public."Dictionary"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Dictionary Dictionary_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dictionaries
--

ALTER TABLE ONLY public."Dictionary"
    ADD CONSTRAINT "Dictionary_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Dictionary"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

