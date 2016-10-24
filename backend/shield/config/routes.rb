Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: 'companies/0/auth' #controllers: { sessions: "sessions" }
  resources :companies do
    resources :residents
    get 'residents/find/:id' => 'residents#find'
    resources :vehicules
    get 'vehicules/find/:id' => 'vehicules#find'
    resources :houses do
    put 'desocupate/:id' => 'houses#setDesocupated'
    get 'check/desocupated/' => 'houses#checkDesocupated'
    get 'notes/:id' => 'houses#findNotes'
    get 'find/vehicules' => 'houses#findVehicules'
    get 'find/residents' => 'houses#findResidents'
    get 'find/visitants' => 'houses#findVisitants'
    get 'find/visitant/:id' => 'houses#findVisitant'
    end
    resources :notes
    resources :officers
    resources :visitants
    resources :watches
    resources :company_configuration
    get 'visitants/find/:id' => 'visitants#find'
    get 'visitants/invited/find/:id' => 'visitants#findRegisteredVisitant'
    resources :access_door
    resources :users do
    get '/sign_in_count' => :count


    end
  end
  resources :roles


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
