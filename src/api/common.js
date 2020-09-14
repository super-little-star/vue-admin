import { reactive, ref } from "@vue/composition-api";
import { getCategory } from "./Info";
export function common() {
  const category = reactive({
    item: null
  });
  const getInfoCategory = () => {
    if (category.item != null) return;
    getCategory()
      .then(data => {
        category.item = data.data;
      })
      .catch(data => {
        console.log(data.message);
      });
  };

  return {
    getInfoCategory,
    category
  };
}
