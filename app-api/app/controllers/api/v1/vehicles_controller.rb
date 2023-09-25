
module Api
  module V1
    
    class VehiclesController < ApplicationController
      before_action :set_vehicle, only: %i[ show update destroy ]

      # GET /vehicles
      def index
        @vehicles = Vehicle.joins(:state).select('states.name AS state_name, vehicles.*')

        handle_response({"data" => @vehicles, "success" => true}, "fetched all vehicles.")
      end

      # GET /vehicles/1
      def show
        handle_response({"data" => @vehicle, "success" => true}, "fetched vehicle.")
      end

      # POST /vehicles
      def create

        begin
        
          @vehicle = Vehicle.new(vehicle_params)

          if @vehicle.save
            handle_response({"data" => @vehicle, "success" => true}, "vehicle created successfully.")
          end
        
        rescue ActiveRecord::InvalidForeignKey
          handle_response({
                "success" => false,
                "message" => "Requested state not found.", 
                "errors" => "Requested state not found."
            })
        rescue
          handle_response({
                "success" => false,
                "message" => "Requested failed.", 
                "errors" => @vehicle.errors
          }, "", 413)
        end
      end

      # PATCH/PUT /vehicles/1
      def update

        begin
        
          if @vehicle.update(vehicle_params)
            handle_response({"data" => @vehicle, "success" => true}, "vehicle updated successfully.")
          end
        
        rescue ActiveRecord::InvalidForeignKey
          handle_response({
                "success" => false,
                "message" => "Requested state not found.", 
                "errors" => "Requested state not found."
            })
        rescue
          handle_response({
            "success" => false,
            "message" => "Requested failed.", 
            "errors" => @vehicle.errors
          }, "", 413)
        end
      end

      # DELETE /vehicles/1
      def destroy
        @vehicle.destroy

        handle_response({"data" => @vehicle, "success" => true}, "vehicle deleted successfully.")
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_vehicle
          begin
        
            @vehicle = Vehicle.find(params[:id])
          
          rescue ActiveRecord::RecordNotFound
            handle_response({
                  "success" => false,
                  "message" => "Requested vehicle not found.", 
                  "errors" => "Requested vehicle not found."
              })
          end
        end

        # Only allow a list of trusted parameters through.
        def vehicle_params
          params.require(:vehicle).permit(:name, :state_id)
        end

        def update_vehicle_params
          params.require(:vehicle).permit(:state_id)
        end
    end

  end
end
