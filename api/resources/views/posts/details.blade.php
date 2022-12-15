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
          <title>Detail post</title>
        </head>
        <body>
                    <div class="row">
                        <div class="col s12 m8 offset-m2">
                        <h2 class="header center">{{$a->titre}}</h2>
                        <div class="card horizontal hoverable">
                          <div class="card-image">
                          <img src="images/image.jpeg">
                          </div>
                          <div class="card-stacked">
                            <div class="card-content">
                              <table class="bordered striped">
                                <tbody>
                                  <tr>
                                    <td>Nom du posteur</td>
                                    <td><strong>{{$a->user_id}}</strong></td>
                                  </tr>
                                  <tr>
                                    <td>Contenu</td>
                                    <td><p>{{$a->contenu}}</p></td>
                                  </tr>
                                  <tr>
                                    <td>Avatar</td>
                                    <td><strong>kjkjkkkl</strong></td>
                                  </tr>
                                  <tr>
                                    <td>Fichier avatar</td>
                                    <td>
                                      <span>kljkkllklk</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Date de création</td>
                                    <td><em>12/04/2022</em></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div class="card-action">
                              <a href="{{ route('dashboard') }}">Retour </a>
                            
                            </div>
                          </div>
                        </div>
                        </div>
                        </div>
                
                        </body>
  </html>