<script>
  import LongData from './LONG_DATA';
  import { books } from '../lib/storeBook';
  books.swap(LongData);
</script>

<svelte:head>
  <script defer src="./LONG_DATA.js"></script>
</svelte:head>
