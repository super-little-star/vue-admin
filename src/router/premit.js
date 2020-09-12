import router from "@/router";
import { GetToken } from "@/utils/app";

const whiteRouter = ["/login"];

router.beforeEach((to, from, next) => {
  console.log(to.path);
  if (GetToken()) {
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) next();
    else next("/login");
  }
});
