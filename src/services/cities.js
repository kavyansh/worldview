import supabase from "./supabase";

export async function createCity(newCity) {
  const { data, error } = await supabase
    .from("cities")
    .insert([newCity])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Could not create City");
  }

  return data;
}

export async function fetchCity(id) {
  const { data, error } = await supabase
    .from("cities")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error(`Could not fetch City ${id}`);
  }

  return data;
}

export async function fetchCities() {
  let { data: cities, error } = await supabase.from("cities").select("*");
  if (error) {
    console.log(error);
    throw new Error("Could not fetch Cities");
  }

  return cities;
}

export async function deleteCity(id) {
  const { error } = await supabase.from("cities").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error(`Could not delete City ${id}`);
  }
}
