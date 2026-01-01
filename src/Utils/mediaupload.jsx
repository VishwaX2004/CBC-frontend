import { createClient } from "@supabase/supabase-js";

const anonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcGNicHh0c3FqZnhqcWZtY2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNjkxMjAsImV4cCI6MjA4Mjg0NTEyMH0.HWNH7muENIC0Ukhh9lSvuXnrf0zX3YB5as5M1URXlnA";

const supabaseUrl = "https://wepcbpxtsqjfxjqfmchl.supabase.co";

const supabase = createClient(supabaseUrl, anonkey);


export default function Mediaupload(file) {
    return new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject("No file provided");
                return;
            } else {

                const timestamp = new Date().getTime();

                const fileName = timestamp + file.name;

                supabase.storage.from("Images").upload(fileName, file, {
                    upsert: false,
                    cacheControl: "3600",
                }).then(() => {
                    const publicUrl = supabase.storage.from("Images").getPublicUrl(fileName).data.publicUrl;
                    console.log(publicUrl);

                    resolve(publicUrl);
                }).catch((error) => {
                    reject(error);
                }
                );
            }

        })
}