--
-- PostgreSQL database dump
--

\restrict gOvAFeVNt4rsVYyjIdybVSHvm1uEDn4oMDpB2PatEVGbLQRj7Kv6YzdZAeQbzeM

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: categoria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categoria (
    id_categoria integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(250),
    estado boolean DEFAULT true NOT NULL
);


--
-- Name: categoria_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.categoria ALTER COLUMN id_categoria ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categoria_id_categoria_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: coincidencia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.coincidencia (
    id_coincidencia integer NOT NULL,
    id_reporte_perdido integer NOT NULL,
    id_reporte_encontrado integer NOT NULL,
    puntaje_caracteristicas numeric(5,2) DEFAULT 0,
    puntaje_fecha numeric(5,2) DEFAULT 0,
    puntaje_ubicacion numeric(5,2) DEFAULT 0,
    puntaje_evento numeric(5,2) DEFAULT 0,
    puntaje_total numeric(5,2) DEFAULT 0 NOT NULL,
    estado character varying(20) DEFAULT 'PENDIENTE'::character varying NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_puntaje_total CHECK (((puntaje_total >= (0)::numeric) AND (puntaje_total <= (100)::numeric))),
    CONSTRAINT ck_puntajes CHECK ((((puntaje_caracteristicas >= (0)::numeric) AND (puntaje_caracteristicas <= (40)::numeric)) AND ((puntaje_fecha >= (0)::numeric) AND (puntaje_fecha <= (20)::numeric)) AND ((puntaje_ubicacion >= (0)::numeric) AND (puntaje_ubicacion <= (20)::numeric)) AND ((puntaje_evento >= (0)::numeric) AND (puntaje_evento <= (20)::numeric)))),
    CONSTRAINT coincidencia_estado_check CHECK (((estado)::text = ANY ((ARRAY['PENDIENTE'::character varying, 'CONFIRMADA'::character varying, 'RECHAZADA'::character varying])::text[])))
);


--
-- Name: coincidencia_id_coincidencia_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.coincidencia ALTER COLUMN id_coincidencia ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.coincidencia_id_coincidencia_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: entrega; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entrega (
    id_entrega integer NOT NULL,
    id_coincidencia integer NOT NULL,
    id_usuario_admin integer NOT NULL,
    fecha_entrega timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    observaciones text
);


--
-- Name: entrega_id_entrega_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.entrega ALTER COLUMN id_entrega ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.entrega_id_entrega_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: evento; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evento (
    id_evento integer NOT NULL,
    nombre character varying(150) NOT NULL,
    descripcion text,
    fecha_evento date,
    estado boolean DEFAULT true NOT NULL
);


--
-- Name: evento_id_evento_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.evento ALTER COLUMN id_evento ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.evento_id_evento_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: historial_estado; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.historial_estado (
    id_historial integer NOT NULL,
    id_reporte integer NOT NULL,
    id_usuario integer NOT NULL,
    estado_anterior character varying(20),
    estado_nuevo character varying(20) NOT NULL,
    observacion text,
    fecha_cambio timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: historial_estado_id_historial_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.historial_estado ALTER COLUMN id_historial ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.historial_estado_id_historial_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: reporte; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reporte (
    id_reporte integer NOT NULL,
    id_usuario integer NOT NULL,
    id_categoria integer NOT NULL,
    id_ubicacion integer NOT NULL,
    id_evento integer,
    tipo character varying(15) NOT NULL,
    nombre_objeto character varying(150) NOT NULL,
    descripcion text NOT NULL,
    caracteristicas text,
    color character varying(50),
    fecha_ocurrencia date NOT NULL,
    fecha_reporte timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado character varying(20) DEFAULT 'PUBLICADO'::character varying NOT NULL,
    CONSTRAINT reporte_estado_check CHECK (((estado)::text = ANY ((ARRAY['PUBLICADO'::character varying, 'EN_REVISION'::character varying, 'RECUPERADO'::character varying, 'CERRADO'::character varying])::text[]))),
    CONSTRAINT reporte_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['PERDIDO'::character varying, 'ENCONTRADO'::character varying])::text[])))
);


--
-- Name: reporte_id_reporte_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.reporte ALTER COLUMN id_reporte ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reporte_id_reporte_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: ubicacion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ubicacion (
    id_ubicacion integer NOT NULL,
    nombre character varying(120) NOT NULL,
    descripcion character varying(250),
    estado boolean DEFAULT true NOT NULL
);


--
-- Name: ubicacion_id_ubicacion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.ubicacion ALTER COLUMN id_ubicacion ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ubicacion_id_ubicacion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    correo character varying(150) NOT NULL,
    contrasena character varying(255) NOT NULL,
    rol character varying(20) DEFAULT 'USUARIO'::character varying NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT usuario_rol_check CHECK (((rol)::text = ANY ((ARRAY['USUARIO'::character varying, 'ADMIN'::character varying])::text[])))
);


--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.usuario ALTER COLUMN id_usuario ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuario_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: categoria categoria_nombre_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_nombre_key UNIQUE (nombre);


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id_categoria);


--
-- Name: coincidencia coincidencia_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coincidencia
    ADD CONSTRAINT coincidencia_pkey PRIMARY KEY (id_coincidencia);


--
-- Name: entrega entrega_id_coincidencia_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entrega
    ADD CONSTRAINT entrega_id_coincidencia_key UNIQUE (id_coincidencia);


--
-- Name: entrega entrega_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entrega
    ADD CONSTRAINT entrega_pkey PRIMARY KEY (id_entrega);


--
-- Name: evento evento_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_pkey PRIMARY KEY (id_evento);


--
-- Name: historial_estado historial_estado_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historial_estado
    ADD CONSTRAINT historial_estado_pkey PRIMARY KEY (id_historial);


--
-- Name: reporte reporte_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reporte
    ADD CONSTRAINT reporte_pkey PRIMARY KEY (id_reporte);


--
-- Name: ubicacion ubicacion_nombre_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ubicacion
    ADD CONSTRAINT ubicacion_nombre_key UNIQUE (nombre);


--
-- Name: ubicacion ubicacion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ubicacion
    ADD CONSTRAINT ubicacion_pkey PRIMARY KEY (id_ubicacion);


--
-- Name: coincidencia uq_coincidencia; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coincidencia
    ADD CONSTRAINT uq_coincidencia UNIQUE (id_reporte_perdido, id_reporte_encontrado);


--
-- Name: usuario usuario_correo_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- Name: idx_coincidencia_estado; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_coincidencia_estado ON public.coincidencia USING btree (estado);


--
-- Name: idx_historial_reporte; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_historial_reporte ON public.historial_estado USING btree (id_reporte);


--
-- Name: idx_reporte_categoria; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_reporte_categoria ON public.reporte USING btree (id_categoria);


--
-- Name: idx_reporte_estado; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_reporte_estado ON public.reporte USING btree (estado);


--
-- Name: idx_reporte_tipo; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_reporte_tipo ON public.reporte USING btree (tipo);


--
-- Name: idx_reporte_ubicacion; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_reporte_ubicacion ON public.reporte USING btree (id_ubicacion);


--
-- Name: coincidencia fk_coincidencia_encontrado; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coincidencia
    ADD CONSTRAINT fk_coincidencia_encontrado FOREIGN KEY (id_reporte_encontrado) REFERENCES public.reporte(id_reporte);


--
-- Name: coincidencia fk_coincidencia_perdido; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coincidencia
    ADD CONSTRAINT fk_coincidencia_perdido FOREIGN KEY (id_reporte_perdido) REFERENCES public.reporte(id_reporte);


--
-- Name: entrega fk_entrega_admin; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entrega
    ADD CONSTRAINT fk_entrega_admin FOREIGN KEY (id_usuario_admin) REFERENCES public.usuario(id_usuario);


--
-- Name: entrega fk_entrega_coincidencia; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entrega
    ADD CONSTRAINT fk_entrega_coincidencia FOREIGN KEY (id_coincidencia) REFERENCES public.coincidencia(id_coincidencia);


--
-- Name: historial_estado fk_historial_reporte; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historial_estado
    ADD CONSTRAINT fk_historial_reporte FOREIGN KEY (id_reporte) REFERENCES public.reporte(id_reporte);


--
-- Name: historial_estado fk_historial_usuario; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historial_estado
    ADD CONSTRAINT fk_historial_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: reporte fk_reporte_categoria; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reporte
    ADD CONSTRAINT fk_reporte_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id_categoria);


--
-- Name: reporte fk_reporte_evento; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reporte
    ADD CONSTRAINT fk_reporte_evento FOREIGN KEY (id_evento) REFERENCES public.evento(id_evento);


--
-- Name: reporte fk_reporte_ubicacion; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reporte
    ADD CONSTRAINT fk_reporte_ubicacion FOREIGN KEY (id_ubicacion) REFERENCES public.ubicacion(id_ubicacion);


--
-- Name: reporte fk_reporte_usuario; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reporte
    ADD CONSTRAINT fk_reporte_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- PostgreSQL database dump complete
--

\unrestrict gOvAFeVNt4rsVYyjIdybVSHvm1uEDn4oMDpB2PatEVGbLQRj7Kv6YzdZAeQbzeM

