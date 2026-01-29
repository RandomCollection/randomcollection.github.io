## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"
  integrity="sha384-5xdYoZ0Lt6Jw8GFfRP91J0jaOVUq7DGI1J5wIyNi0D+eHVdfUwHR4gW6kPsw489E"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/go.min.js"
  integrity="sha384-HdearVH8cyfzwBIQOjL/6dSEmZxQ5rJRezN7spps8E7iu+R6utS8c2ab0AgBNFfH"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-Gmvct15f4Mo9AXQG5bk5w78N1YjBLXXU3KIV7no+mOVnApXlwfw1dwjfueAwljIV /es/languages/css.js
sha384-1D7DbOic0Z5nM2ldSO9O/EsBfsg/5x7X7So1qnMgscI2ucDevptcg7cTvrD9rL0D /es/languages/css.min.js
sha384-8CRS96Xb/ZkZlQU+5ffA03XTN6/xY40QAnsXKB0Y+ow1vza1LAkRNPSrZqGSNo53 /es/languages/json.js
sha384-UHzaYxI/rAo84TEK3WlG15gVfPk49XKax76Ccn9qPWYbUxePCEHxjGkV+xp9HcS/ /es/languages/json.min.js
sha384-Ap4gnRYGNAeKXru7neutEvzrhsYnnP1suT5zxW2zdmv6rCl43QzqqLEJ1F3kZWWm /es/languages/latex.js
sha384-bx4oC5pPCnrSzdPzDg3L9UsoJWiptFFwoGWKup6bRk82EzPFrquQa7T7I9iDwnXa /es/languages/latex.min.js
sha384-+KkqXkoHKtuOmUzhZ0BjyV0qjljnS+z6i4fELMEg5brFPtmDIog4zZMhylaBTsVi /es/languages/markdown.js
sha384-E7UvgBH6skA1FIOcn3B2c68GtJzrmZlOOC5p/fsxwihTZG/bBedJZu5PC1+kGX7q /es/languages/markdown.min.js
sha384-R7N9ng1N/Cb7RLskF1tB8AWD6kKnUs3LXqrJTj0aTGGXswS2sWq/XFUWPpEKSxqu /es/languages/powershell.js
sha384-GZl3J+HUi40wO5QngTvTpHXB0M2gGDnn9E/MyHRRS4VEWDNCS96bODclYTX3/JId /es/languages/powershell.min.js
sha384-Cmq5lORXzyHraasLNqmfchH07JRXyEmjDF+j6tSggoXjYHwtgX/ySW6kkRytM5uu /es/languages/python.js
sha384-ZV5sgX70bBgLkDR5Mtox5UsbJedBc39hRKPdvTw6miK4lSkE/wv94cLY2iyZb/sB /es/languages/python.min.js
sha384-9jy7CI5TLYs91VYlZ4S0czQFpDsMzc9jakiJ5RqCFZugGpdPglP94JPAyEhMBwJp /es/languages/python-repl.js
sha384-CO+NiDedness48VlHW0FCIw9rQt8szFZ0IOXYiQo3LEAHLytXxM5NlKnmNYBUACQ /es/languages/python-repl.min.js
sha384-WvSYExpTBj+SndhQhJaikfSwWqkwJIHrgboUyLDNPLyNXRTaAzH2DOexIkEnL4XH /es/languages/sas.js
sha384-o1wXT68gljvlYb32XXeGTKoSMxzLH6idNrn14QDM6cCSLE+cSZ2rsHxWohlp94RV /es/languages/sas.min.js
sha384-1mmBZmAs44b6FtD9wpMiLJa8bLZgZv9xoAhngN6B5Q22y9CtcsU2lat0zlRtyVgy /es/languages/shell.js
sha384-u9PV7oWG/lZlm+GnftX7kn0w4b8rRfFxSv5SmJJPHWKGI03rz6VLqgZdQ1B5ez6b /es/languages/shell.min.js
sha384-s1ZfN6xtlNKAZux8QYAG7upUsit3RwK5XDoCAN3g6Kj33RrIqbmkuGjdNF9RvzPM /es/languages/sql.js
sha384-y25cn06synxhYnlKVprZdpakuFWVrm2jvn8pqiF4L85a05CI/6bNeT2+qXbUYIyW /es/languages/sql.min.js
sha384-7HTgKp/l2rzlyrh5vUfbfZVy+Wx1lKO4iGmfqvakienApv21u55lo+Vi+iVg4jY0 /es/languages/yaml.js
sha384-4smueUtgWTorlNLbaQIawnVCcIAuw82NetPOGWN5PbZT/pMr0rjvZXj0EUzJV1nr /es/languages/yaml.min.js
sha384-bsb3QmLtUiyaiHwtrL4YoAVI9yLsjyqxgoAsk4Zd+ass9rSK1WWRiCDSu/hm8QRp /languages/css.js
sha384-0XGvxIU7Oq1DQMMBr1ORiozzBq3KpZPE/74mJysWRBAop1dZ9Ioq/qRWe8u30Ded /languages/css.min.js
sha384-pUlqdjoNePvHvdi7GVKJJnh/P2T3EvXXodl5j0JtTkbNC4DRH7gwGbcHFa84bFOP /languages/json.js
sha384-3C+cPClJZgjKFYAb0bh35D7im2jasLzgk9eRix3t1c5pk1+x6b+bHghWcdrKwIo3 /languages/json.min.js
sha384-gC1LLqQxzTtslF1/nhSmFhIyScy7u0VnfVPDE45XlK+Ed/wgeOK0zae/DRDGNTDs /languages/latex.js
sha384-A8E38+eenPg19mMk5Ikv1fetaPL/yA2OsGR3hFs9TeeBX+zQ8u5bZNsPKmlFHwN4 /languages/latex.min.js
sha384-Sk9XW/OOutdl6KS1M9Wson0imuqr0LkpoTRDHi5QFH4MWe0aViI5d86BOVkh8Ds0 /languages/markdown.js
sha384-Rv26WbhHH4MDPzeExq4ECmZUYF942tlfVhqA91Drw1P+Ey55KjihLF9RJENxjWr1 /languages/markdown.min.js
sha384-IovgHYXogGBldWibmA9aDifITNGdjEeaRUjvsJ3l4Rf4LVusXXcOZUCSxBEhXWqY /languages/powershell.js
sha384-q/8iVbv95DiFN+l7qeoBwJ0Wju7gozJemMfG3DdxiOR8CfA/2dKvKA3W5t4l/n9t /languages/powershell.min.js
sha384-ueSSFZFqg7cVD0dpEqIk9EefJiJUYan0PH6I8u/p+bNLLx7dMs4J2keMaFXqCN8P /languages/python.js
sha384-eXRt+aAa2ig1yFVDQCLis8k9s/1dikTcigj+/R07yNdIxc8BAG/b1uHDyEW3of17 /languages/python.min.js
sha384-Zr5t2YaLU0giGFY/MuBA8UrK47JGpd9DuryiosYFRSQ6EJfTIF9mt8IJp/4/hpOU /languages/python-repl.js
sha384-n3iFvvEGhuJlnYpLj6JaCg7WiOhd8kQfKTZBDnpJwFZ0puRMhoq9JWtKDRw5Snyq /languages/python-repl.min.js
sha384-33xf+MQ6ZGuxdzLYco6audBlrEbjavYLbelF3x9Pi0Sl09pjWK8rcybXR12ur1Pu /languages/sas.js
sha384-iOnKe2LMBqjs68mlL/D1dkE5L+VIDjq12UUO1TyKepWMsj25PDJokYjsmaDrzqfy /languages/sas.min.js
sha384-BanM6jNzM3hgNw0Vu3gSe58a3MK3PSlMUzh5s8QaaDzIvTWgB0jNetV3rNxteKHy /languages/shell.js
sha384-mSZF08WaP0Llc4GMwE0KA2V9yfZQimO5PvfcXf2AATDdqri3Q7IdV7pfbhVPJCHV /languages/shell.min.js
sha384-2sXmcW3eKeNDWiLtuq9NgFJC4NsLBN/fDTzZevmcgBrSERv6iO/k+c7r9T09Fb8J /languages/sql.js
sha384-jrnLoVn13sB+/dTfoAYVPhg0tYGQzzuzSGP3WTk8OvKAY0hDejpUXFYYI3bohAyW /languages/sql.min.js
sha384-6GXi9L5BnOWPU6bzwYL78Zscp23qyDdMLZpZvp4mLzvF2qt0eY/DfsPHiFVXq4hv /languages/yaml.js
sha384-A/iMReLA0Bo3tLydBIoOQXQzYnrwL90jkHYUubrtERUGCbIuU7U0EHge0Xd2s5sr /languages/yaml.min.js
sha384-+6h0GUcII1iLB9VkMS9AcuLNPCDIs4Q2E711M66hIJoNIeBfYev1XoGpb1MtjlyG /highlight.js
sha384-3pz4t+vU7Mn/SPHv855K9Csz2unYKCrzM2dlpx8/D+eJPvvKkXRDhZ8a5smTPRhz /highlight.min.js
```

