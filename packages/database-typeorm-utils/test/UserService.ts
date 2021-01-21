import { getConnection } from "typeorm";
import { User } from "./entity/User";
import "./Connection";
import { initDatabase } from "./Connection";
import { Profile } from "./entity/Profile";
import { Photo } from "./entity/Photo";

async function insertUser() {
  await initDatabase();

  const profileRepo = await getConnection().getRepository(Profile);
  const profile = new Profile();
  profile.gender = "1";
  await profileRepo.save(profile);

  const photoRepo = await getConnection().getRepository(Photo);
  const photo1 = new Photo();
  photo1.url = "url-1";
  const photo2 = new Photo();
  photo2.url = "url-2";
  await photoRepo.save(photo1);
  await photoRepo.save(photo2);

  const userRepo = await getConnection().getRepository(User);
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;
  user.profile = profile;
  user.photos = [photo1, photo2];
  await userRepo.save(user);
}

insertUser();
