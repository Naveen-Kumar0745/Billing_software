import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

  // SAVE BILL
  if (req.method === "POST") {
    const { user_email, bill_no, customer, items, total } = req.body;

    const { error } = await supabase
      .from("bills")
      .insert([{
        user_email,
        bill_no,
        customer,
        items,
        total
      }]);

    if (error) {
      return res.status(400).json({ msg: "Error saving bill" });
    }

    return res.json({ msg: "Bill saved successfully" });
  }

  // GET BILLS
  if (req.method === "GET") {
    const email = req.query.email;

    const { data } = await supabase
      .from("bills")
      .select("*")
      .eq("user_email", email)
      .order("created_at", { ascending: false });

    return res.json(data);
  }

  res.status(405).json({ msg: "Method not allowed" });
}
