<x-app-layout>

  <!DOCTYPE html>
  <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!-- Compiled and minified CSS -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

        <!-- Compiled and minified JavaScript -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <title>Post List</title>
        </head>
       <body>
            <div>
              <form class="form-inline my-2 my-lg-0" type="get" action="{{route('searchpost')}}">
                <input class="form-control mr-sm-2" name="query" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Rechercher</button>
              </form>
            </div>
            <h1 style="text-align:center">Liste des Posts</h1>

            <div class="row">
              <div class="col s4 m3">
                <div class="card">
                  <div class="card-image">
                    <img src="images/image.jpeg">
                  </div>
                  <div class="card-content" >
                  <h5 class="card-title">titre:voir</h5>
                  <p class="card-text">Contenuhjkkjkhkjjjjjmbbbb</p>
                   <h6>Nom du posteur</h6>
                  <a href="#" class="btn btn-primary">Plus d info</a>
                  </div>
                </div>
              </div>

              <div class="col s4 m3">
                <div class="card">
                  <div class="card-image">
                    <img src="images/image.jpeg">
                  </div>
                  <div class="card-content" >
                  <h5 class="card-title">titre:text</h5>
                  <p class="card-text">Contenuhjkkjkhkjjjjjmbbbb</p>
                   <h6>Nom du posteur</h6>
                  <a href="{{ route('detailpost') }}"class="btn btn-primary">Plus d info</a>
                  </div>
                </div>
              </div>
            </div>
  

            
        </body>
  </html>
        
</x-app-layout>