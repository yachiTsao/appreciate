<template>
  <div v-if="item !== '-'" class="d-flex align-center">
    <v-sheet
      :color="userStatus(item).color"
      width="16"
      height="16"
      rounded
      class="mr-2"
    ></v-sheet>
    {{ $t(userStatus(item).value) }}
  </div>
  <p v-else>-</p>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = "TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk";
} catch (e) {
  console.log("TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk");
}
interface Props {
  item: string | number;
}
const props = withDefaults(defineProps<Props>(), {
  // item: () => ({}),
});
function userStatus(item: string | number) {
  let status = {
    color: "gray-40",
    value: "general.itemStatus.inactive",
  };
  switch (item.toString()) {
    case "1":
      status.color = "success";
      status.value = "general.itemStatus.active";
      break;
    case "3":
      status.color = "primary-orange";
      status.value = "general.itemStatus.initial";
      break;
    case "Active":
      status.color = "success";
      status.value = "general.itemStatus.active";
      break;
    case "In Review":
      status.color = "primary-orange";
      status.value = "general.itemStatus.inReview";
      break;
    case "Rejected":
      status.color = "error";
      status.value = "general.itemStatus.rejected";
      break;
    case "Waiting":
      status.color = "primary-orange";
      status.value = "general.itemStatus.waiting";
      break;
    case "Inactive":
      status.color = "gray-40";
      status.value = "general.itemStatus.inactive";
      break;
    case "Approved":
      status.color = "success";
      status.value = "general.itemStatus.approved";
      break;
    default:
      status.color = "gray-40";
      status.value = "general.itemStatus.inactive";
      break;
  }
  return status;
}
</script>
<style lang="scss" scoped></style>
