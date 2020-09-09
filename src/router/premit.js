import router from "@/router";
import { GetToken } from "@/utils/app";

const whiteRouter = ["/login"];

router.beforeEach((to, from, next) => {
  console.log(to.path);
  if (GetToken()) {
    console.log("have token");
  } else {
    console.log("token undefind");
    if (whiteRouter.indexOf(to.path) !== -1) next();
    else next("/login");
  }
});
