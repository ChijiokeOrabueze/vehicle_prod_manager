module Api
  module V1

    

    class StatesController < ApplicationController
      before_action :set_state, only: %i[ show update destroy ]
      
      # @@handler = ResponseHandler.new
      # GET /states
      def index
        @states = State.all

        handle_response({"data" => @states, "success" => true}, "fetched all states.")
      end

      # GET /states/1
      def show
        handle_response({"data" => @states, "success" => true}, "fetched state.")
      end

      # POST /states
      def create
        @state = State.new(state_params)

        if @state.save
          handle_response({"data" => @state, "success" => true}, "state created successfully.")
        else
          handle_response({
              "success" => false,
              "message" => "Requested failed.", 
              "errors" => @state.errors
          }, "", 413)
        end
      end

      # PATCH/PUT /states/1
      def update
        if @state.update(state_params)
          handle_response({"data" => @state, "success" => true}, "state updated successfully.")
        else
          handle_response({
              "success" => false,
              "message" => "Requested failed.", 
              "errors" => @state.errors
          }, "", 413)
        end
      end

      # DELETE /states/1
      def destroy
        @state.destroy
        handle_response({"data" => @state, "success" => true}, "state deleted successfully.")
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_state
          begin
        
            @state = State.find(params[:id])
          
          rescue ActiveRecord::RecordNotFound
            handle_response({
                  "success" => false,
                  "message" => "Requested state not found.", 
                  "errors" => "Requested state not found."
            })
          end
          
        end

        # Only allow a list of trusted parameters through.
        def state_params
          params.require(:state).permit(:name, :alias, :order, :min_permission)
        end
    end

  end
end
