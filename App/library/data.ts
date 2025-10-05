import { getid } from "./services";
import { supabase } from "./supabase";

export const fetchuser = async () => {
    const id = await getid(); // get the saved user ID
    if (!id) return null; // handle case when ID is not found

    const { data, error } = await supabase
        .from('Profile')
        .select('*')
        .eq('id', id);

    if (error) {
        console.log("Fetch user error:", error.message);
        return null;
    }

    return data;
};