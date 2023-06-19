create type "public"."Roles" as enum ('STAFF', 'STUDENT');

create table "public"."Account" (
    "id" uuid not null default gen_random_uuid(),
    "userId" uuid not null,
    "type" text not null,
    "provider" text not null,
    "providerAccountId" text not null,
    "refresh_token" text,
    "access_token" text,
    "expires_at" integer,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text
);


create table "public"."Session" (
    "id" uuid not null default gen_random_uuid(),
    "sessionToken" text not null,
    "userId" uuid not null,
    "expires" timestamp(3) without time zone not null
);


create table "public"."User" (
    "id" uuid not null default gen_random_uuid(),
    "first_name" text not null,
    "last_name" text not null,
    "mail_id" text not null,
    "password" text,
    "address" text not null,
    "prof_image" text not null,
    "sem_no" text not null,
    "role" "Roles" not null,
    "college_code" text not null,
    "branch_name" text not null
);


create table "public"."VerificationToken" (
    "identifier" text not null,
    "token" text not null,
    "expires" timestamp(3) without time zone not null
);


create table "public"."answers" (
    "id" text not null default gen_random_uuid(),
    "answer" text not null,
    "userId" uuid,
    "questionsId" text,
    "marks" integer not null
);


create table "public"."branch" (
    "branch_name" text not null
);


create table "public"."college" (
    "college_code" text not null,
    "college_name" text not null,
    "address" text not null,
    "college_mail" text not null,
    "college_website" text not null
);


create table "public"."marks" (
    "id" text not null default gen_random_uuid(),
    "userId" uuid,
    "testsId" uuid,
    "marks" integer not null
);


create table "public"."notes" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "unit_no" text not null,
    "unit_name" text not null,
    "sem_no" text not null,
    "sub_code" text not null,
    "uploaded_date" timestamp with time zone default CURRENT_TIMESTAMP,
    "likes" integer not null,
    "dislikes" integer not null,
    "file_url" text,
    "limit_visibility" boolean default false,
    "usersId" uuid not null,
    "branch_name" text not null
);


create table "public"."questions" (
    "id" text not null default gen_random_uuid(),
    "question" text not null,
    "choices" text[],
    "answer" text not null,
    "testsId" uuid
);


create table "public"."semesters" (
    "sem_no" text not null
);


create table "public"."subjects" (
    "sub_code" text not null,
    "sub_name" text not null,
    "sem_no" text not null
);


create table "public"."tests" (
    "id" uuid not null default gen_random_uuid(),
    "test_title" text not null,
    "subjectsSub_code" text,
    "userId" uuid
);


create table "public"."user_details" (
    "id" uuid not null default gen_random_uuid(),
    "reg_no" text,
    "bio" text,
    "qualification" text,
    "usersId" uuid
);


CREATE UNIQUE INDEX "Account_pkey" ON public."Account" USING btree (id);

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");

CREATE UNIQUE INDEX "Session_pkey" ON public."Session" USING btree (id);

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");

CREATE INDEX "User_id_idx" ON public."User" USING btree (id);

CREATE UNIQUE INDEX "User_mail_id_key" ON public."User" USING btree (mail_id);

CREATE UNIQUE INDEX "User_pkey" ON public."User" USING btree (id);

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);

CREATE UNIQUE INDEX answers_pkey ON public.answers USING btree (id);

CREATE UNIQUE INDEX branch_branch_name_key ON public.branch USING btree (branch_name);

CREATE UNIQUE INDEX branch_pkey ON public.branch USING btree (branch_name);

CREATE UNIQUE INDEX college_college_code_key ON public.college USING btree (college_code);

CREATE UNIQUE INDEX college_pkey ON public.college USING btree (college_code);

CREATE UNIQUE INDEX marks_pkey ON public.marks USING btree (id);

CREATE UNIQUE INDEX notes_pkey ON public.notes USING btree (id);

CREATE UNIQUE INDEX questions_pkey ON public.questions USING btree (id);

CREATE UNIQUE INDEX semesters_pkey ON public.semesters USING btree (sem_no);

CREATE UNIQUE INDEX semesters_sem_no_key ON public.semesters USING btree (sem_no);

CREATE UNIQUE INDEX subjects_pkey ON public.subjects USING btree (sub_code);

CREATE UNIQUE INDEX tests_pkey ON public.tests USING btree (id);

CREATE UNIQUE INDEX user_details_pkey ON public.user_details USING btree (id);

CREATE UNIQUE INDEX user_details_reg_no_key ON public.user_details USING btree (reg_no);

alter table "public"."Account" add constraint "Account_pkey" PRIMARY KEY using index "Account_pkey";

alter table "public"."Session" add constraint "Session_pkey" PRIMARY KEY using index "Session_pkey";

alter table "public"."User" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

alter table "public"."answers" add constraint "answers_pkey" PRIMARY KEY using index "answers_pkey";

alter table "public"."branch" add constraint "branch_pkey" PRIMARY KEY using index "branch_pkey";

alter table "public"."college" add constraint "college_pkey" PRIMARY KEY using index "college_pkey";

alter table "public"."marks" add constraint "marks_pkey" PRIMARY KEY using index "marks_pkey";

alter table "public"."notes" add constraint "notes_pkey" PRIMARY KEY using index "notes_pkey";

alter table "public"."questions" add constraint "questions_pkey" PRIMARY KEY using index "questions_pkey";

alter table "public"."semesters" add constraint "semesters_pkey" PRIMARY KEY using index "semesters_pkey";

alter table "public"."subjects" add constraint "subjects_pkey" PRIMARY KEY using index "subjects_pkey";

alter table "public"."tests" add constraint "tests_pkey" PRIMARY KEY using index "tests_pkey";

alter table "public"."user_details" add constraint "user_details_pkey" PRIMARY KEY using index "user_details_pkey";

alter table "public"."Account" add constraint "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Account" validate constraint "Account_userId_fkey";

alter table "public"."Session" add constraint "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Session" validate constraint "Session_userId_fkey";

alter table "public"."User" add constraint "User_branch_name_fkey" FOREIGN KEY (branch_name) REFERENCES branch(branch_name) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."User" validate constraint "User_branch_name_fkey";

alter table "public"."User" add constraint "User_college_code_fkey" FOREIGN KEY (college_code) REFERENCES college(college_code) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."User" validate constraint "User_college_code_fkey";

alter table "public"."User" add constraint "User_sem_no_fkey" FOREIGN KEY (sem_no) REFERENCES semesters(sem_no) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."User" validate constraint "User_sem_no_fkey";

alter table "public"."answers" add constraint "answers_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES questions(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."answers" validate constraint "answers_questionsId_fkey";

alter table "public"."answers" add constraint "answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."answers" validate constraint "answers_userId_fkey";

alter table "public"."marks" add constraint "marks_testsId_fkey" FOREIGN KEY ("testsId") REFERENCES tests(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."marks" validate constraint "marks_testsId_fkey";

alter table "public"."marks" add constraint "marks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."marks" validate constraint "marks_userId_fkey";

alter table "public"."notes" add constraint "notes_branch_name_fkey" FOREIGN KEY (branch_name) REFERENCES branch(branch_name) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."notes" validate constraint "notes_branch_name_fkey";

alter table "public"."notes" add constraint "notes_sem_no_fkey" FOREIGN KEY (sem_no) REFERENCES semesters(sem_no) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."notes" validate constraint "notes_sem_no_fkey";

alter table "public"."notes" add constraint "notes_sub_code_fkey" FOREIGN KEY (sub_code) REFERENCES subjects(sub_code) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."notes" validate constraint "notes_sub_code_fkey";

alter table "public"."notes" add constraint "notes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."notes" validate constraint "notes_usersId_fkey";

alter table "public"."questions" add constraint "questions_testsId_fkey" FOREIGN KEY ("testsId") REFERENCES tests(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."questions" validate constraint "questions_testsId_fkey";

alter table "public"."subjects" add constraint "subjects_sem_no_fkey" FOREIGN KEY (sem_no) REFERENCES semesters(sem_no) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."subjects" validate constraint "subjects_sem_no_fkey";

alter table "public"."tests" add constraint "tests_subjectsSub_code_fkey" FOREIGN KEY ("subjectsSub_code") REFERENCES subjects(sub_code) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."tests" validate constraint "tests_subjectsSub_code_fkey";

alter table "public"."tests" add constraint "tests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."tests" validate constraint "tests_userId_fkey";

alter table "public"."user_details" add constraint "user_details_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."user_details" validate constraint "user_details_usersId_fkey";


