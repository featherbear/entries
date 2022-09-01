<script lang="ts">
    interface as {
        b: 23
    }
  type A = {
    s: string;
  };

  let B: A = {
    s: "asfd",
  };

  let c = 0;
  console.log("RAN TEST CODE");
  function adad() {
    console.log("test");
    c++
  }
</script>

hey!
{B.s}
{c}
<button on:click={adad}>GO</button>
