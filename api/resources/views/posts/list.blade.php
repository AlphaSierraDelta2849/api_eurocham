<x-app-layout>

  <!DOCTYPE html>
  <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!-- Compiled and minified CSS -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <link rel="stylesheet" type="text/css" id="applicationStylesheet" href="/css/connexion.css" />

        <!-- Compiled and minified JavaScript -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <title>Post List</title>
        </head>
       <body>
       <div class="test">
             <form class="form-inline my-2 my-lg-0" type="get" action="{{route('searchpost')}}" >
                <input class="form-control mr-sm-2" name="query" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i class="material-icons">search</i></button>
              </form>
             </div>
             <h1 style="text-align:center">Liste des Posts</h1>
            @foreach($a as $as)
            <div class="row">
          
                <div class="col s4 m3" >
                    <div class="card">
                    <div class="card-image">
                        <img src="images/image.jpeg">
                    </div>
                    <div class="card-content" >
                    <h5 class="card-title">{{$as->titre}}</h5>
                    <p class="card-text">{{$as->contenu}}</p>
                    <h6>Nom du posteur</h6>
                    <a href="detailpost/{{ $as['id'] }}" class="btn btn-primary">Plus d info</a>
                    </div>
                    </div>
            
              </div>
              @endforeach

            
        </body>
  </html>
        
</x-app-layout>