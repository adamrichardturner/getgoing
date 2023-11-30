--Categories
CREATE TABLE public.categories (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    name VARCHAR(255) NOT NULL
);

--Todos
CREATE TABLE public.todos (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    due_date DATE,
    color VARCHAR(7), -- Storing color as HEX code (e.g., #FFFFFF)
    category_id INTEGER REFERENCES public.categories(id),
    completed BOOLEAN DEFAULT FALSE
);

--RLS Policy for Tables
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

--RLS Policy for Todos Table

-- Policy for selecting own todos
CREATE POLICY select_own_todos ON public.todos
FOR SELECT USING (auth.uid() = user_id);

-- Policy for inserting own todos
CREATE POLICY insert_own_todos ON public.todos
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for updating own todos
CREATE POLICY update_own_todos ON public.todos
FOR UPDATE USING (auth.uid() = user_id);

-- Policy for deleting own todos
CREATE POLICY delete_own_todos ON public.todos
FOR DELETE USING (auth.uid() = user_id);

-- RLS Policy for Categories Table

-- Policy for selecting own categories
CREATE POLICY select_own_categories ON public.categories
FOR SELECT USING (auth.uid() = user_id);

-- Policy for inserting own categories
CREATE POLICY insert_own_categories ON public.categories
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for updating own categories
CREATE POLICY update_own_categories ON public.categories
FOR UPDATE USING (auth.uid() = user_id);

-- Policy for deleting own categories
CREATE POLICY delete_own_categories ON public.categories
FOR DELETE USING (auth.uid() = user_id);

-- Triggers for Automatic Timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.todos
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
