import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { action, email, password } = req.body;

  if (action === "signup") {
    const { error } = await supabase
      .from("users")
      .insert([{ email, password }]);

    if (error) {
      return res.status(400).json({ msg: "User already exists" });
    }

    return res.json({ msg: "Signup successful" });
  }

  if (action === "login") {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (!data) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    return res.json({ msg: "Login successful" });
  }

  res.status(405).json({ msg: "Method not allowed" });
}
