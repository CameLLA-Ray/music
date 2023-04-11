export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value}   text-xl`;

    if (binding.arg === "full") {
      iconClass = binding.value;
    }
    //无法为修饰符赋值
    if (binding.modifiers.right) {
      iconClass += " float-right";
    }

    if (binding.modifiers.yellow) {
      iconClass += " text-yellow-400";
    } else {
      iconClass += " text-green-400";
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
