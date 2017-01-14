Rails.application.routes.draw do
  namespace :api, defaults: { format: :json }, path: '/api'  do
  mount_devise_token_auth_for "User", at: 'companies/0/auth' #controllers: { sessions: "sessions" }
  resources :companies do
    get 'residents/find/enabled' => 'residents#findEnabled'
    get 'residents/find/disabled' => 'residents#findDisabled'
    get 'vehicules/find/enabled' => 'vehicules#findEnabled'
    get 'vehicules/find/disabled' => 'vehicules#findDisabled'
    resources :residents
    get 'residents/find/:id' => 'residents#find'
    resources :vehicules
    get 'vehicules/find/:id' => 'vehicules#find'
    resources :houses do
    put '/reportAbsence/' => 'houses#setDesocupated'
    get 'restore/desocupated/' => 'houses#checkDesocupated'
    get 'check/desocupated/' => 'houses#checkDesocupatedHouse'
    put 'set/desocupated/' => 'houses#setDesocupatedHouse'
    get 'notes/:id' => 'houses#findNotes'
    get 'find/vehicules' => 'houses#findVehicules'
    get 'find/residents' => 'houses#findResidents'
    get 'find/residents/enabled' => 'houses#findResidentsEnabled'
    get 'find/residents/disabled' => 'houses#findResidentsDisabled'
    get 'find/vehicules/enabled' => 'houses#findVehiculesEnabled'
    get 'find/vehicules/disabled' => 'houses#findVehiculesDisabled'
    get 'find/visitants' => 'houses#findVisitants'
    get 'find/invited/visitants' => 'houses#findInvitedVisitants'
    get 'find/visitant/:id' => 'houses#findVisitant'
    get 'find/invited/visitant/:id' => 'houses#findInvitedVisitant'
    end
    resources :notes
    get 'delete/expired/homeservice' => 'notes#destroyOldHomeServices'
    resources :officers
    resources :visitants
    resources :watches
    get 'current/watch/' => 'watches#currentWatch'
    get 'watch/filter/' => 'watches#filterWatches'
    resources :emergencies
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

end
  root 'welcome#index'
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
