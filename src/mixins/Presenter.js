export default {
  filters: {
    prettyNumbers(number) {
      return number
        .toString()
        .split("")
        .reverse()
        .join("")
        .split(/(.{3})/)
        .filter((o) => o)
        .map((s) => s.split("").reverse().join(""))
        .reverse()
        .join();
    },
  },
};
