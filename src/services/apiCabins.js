import supabase, { supabaseUrl } from "./supabase";
import { QUERY_KEY } from "../utils/contants";

export async function getCabins() {
  let { data, error } = await supabase.from(QUERY_KEY.CABINS).select("*");

  if (error) {
    console.error("Cabins could not be loaded");
    console.error(error.message);
    throw new Error(error.message);
  }

  console.log("get cabins", data);

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // this is original image url from the cabins table in cloud
  let imagePath = "";
  // this is the image name from user local harddisk
  let imageName = "";
  let uploadImage = null;

  // this is original image url
  if (hasImagePath) {
    imagePath = newCabin.image;
  }
  // this is user select image file from local harddisk
  else {
    const uuid = crypto.randomUUID();

    if (newCabin.image instanceof FileList && !!newCabin.image.length) {
      imageName = `${uuid}-${newCabin.image[0].name}`.replaceAll("/", "");
      uploadImage = newCabin.image[0];
    } else if (newCabin.image instanceof File) {
      imageName = `${uuid}-${newCabin.image.name}`.replaceAll("/", "");
      uploadImage = newCabin.image;
    }
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1. Create/edit cabin
  let query = supabase.from(QUERY_KEY.CABINS);

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  // https://supabase.com/dashboard/project/qsnpzrhsvwanbhezdsaz/api?resource=cabins
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  // https://supabase.com/docs/reference/javascript/storage-emptybucket
  const { data: storageData, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, uploadImage, {
      cacheControl: "3600",
      upsert: false,
    });

  // 3. Delete the cabin If there was an error uplaoding image
  if (storageError) {
    await supabase.from(QUERY_KEY.CABINS).delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from(QUERY_KEY.CABINS)
    .delete()
    .eq("id", id);

  // TODO: also need to delete the image in the storage

  if (error) {
    console.error(error, error.message);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
