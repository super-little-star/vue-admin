import router from "@/router";
import { GetData, Key } from "@/utils/app";

const whiteRouter = ["/login"];

router.beforeEach((to, from, next) => {
  if (GetData(Key.token)) {
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) next();
    else next("/login");
  }
});
