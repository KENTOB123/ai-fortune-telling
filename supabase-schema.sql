-- Enable Row Level Security
-- IMPORTANT: Replace 'your-jwt-secret' with your actual JWT secret
-- You can generate one using: openssl rand -base64 32
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  streak INTEGER DEFAULT 0,
  stardust INTEGER DEFAULT 0,
  last_login DATE,
  coupon_issued BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create readings table
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  teller TEXT NOT NULL,
  preset TEXT NOT NULL,
  cards JSONB NOT NULL,
  question TEXT,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create daily_horoscope table
CREATE TABLE daily_horoscope (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sign INTEGER NOT NULL CHECK (sign >= 1 AND sign <= 12),
  date DATE NOT NULL,
  short TEXT NOT NULL,
  lucky_card TEXT NOT NULL,
  card_meaning TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sign, date)
);

-- Create card_collection table
CREATE TABLE card_collection (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, card_id)
);

-- Create posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  flux INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (legacy - for backward compatibility)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'plus', 'premium')),
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  daily_usage_count INTEGER DEFAULT 0,
  last_usage_date DATE,
  stripe_customer_id TEXT
);

-- Create fortune_history table (legacy - for backward compatibility)
CREATE TABLE fortune_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  fortuner_id TEXT NOT NULL,
  spread_type TEXT NOT NULL,
  selected_cards TEXT[] NOT NULL,
  result_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorite_fortuners table (legacy - for backward compatibility)
CREATE TABLE favorite_fortuners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  fortuner_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, fortuner_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_horoscope ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_collection ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE fortune_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_fortuners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for readings
CREATE POLICY "Users can view own readings" ON readings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own readings" ON readings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for daily_horoscope (public read)
CREATE POLICY "Anyone can view daily horoscope" ON daily_horoscope
  FOR SELECT USING (true);

-- RLS Policies for card_collection
CREATE POLICY "Users can view own card collection" ON card_collection
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own card collection" ON card_collection
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for posts (public read, authenticated write)
CREATE POLICY "Anyone can view posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for users (legacy)
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for fortune_history (legacy)
CREATE POLICY "Users can view own fortune history" ON fortune_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own fortune history" ON fortune_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for favorite_fortuners (legacy)
CREATE POLICY "Users can view own favorite fortuners" ON favorite_fortuners
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorite fortuners" ON favorite_fortuners
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorite fortuners" ON favorite_fortuners
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_readings_user_id ON readings(user_id);
CREATE INDEX idx_readings_created_at ON readings(created_at);
CREATE INDEX idx_readings_teller ON readings(teller);
CREATE INDEX idx_daily_horoscope_sign_date ON daily_horoscope(sign, date);
CREATE INDEX idx_card_collection_user_id ON card_collection(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);
CREATE INDEX idx_posts_flux ON posts(flux);
CREATE INDEX idx_fortune_history_user_id ON fortune_history(user_id);
CREATE INDEX idx_fortune_history_created_at ON fortune_history(created_at);
CREATE INDEX idx_favorite_fortuners_user_id ON favorite_fortuners(user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update streak and stardust
CREATE OR REPLACE FUNCTION update_streak()
RETURNS TRIGGER AS $$
DECLARE
  today_date DATE := CURRENT_DATE;
  days_diff INTEGER;
BEGIN
  -- Check if this is the first login or if last_login is null
  IF NEW.last_login IS NULL THEN
    NEW.streak := 1;
    NEW.stardust := NEW.stardust + 1;
  ELSE
    days_diff := today_date - NEW.last_login;
    
    IF days_diff = 1 THEN
      -- Consecutive day
      NEW.streak := NEW.streak + 1;
      NEW.stardust := NEW.stardust + NEW.streak;
    ELSIF days_diff > 1 THEN
      -- Break in streak
      NEW.streak := 1;
      NEW.stardust := NEW.stardust + 1;
    END IF;
  END IF;
  
  NEW.last_login := today_date;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for streak update
CREATE TRIGGER update_user_streak
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_streak(); 