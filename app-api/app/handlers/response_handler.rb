class ResponseHandler

    @@view = ActionView::Base.new(ActionController::Base.view_paths)
    
    def handle_response(response, message="")
            
        if response["success"]
            @@view.render json: {status: "success", message: message, data: response["data"]}, status: :ok
        elsif response["internal_error"]
            @@view.render json: {status: "error", message: "Something went wrong. Please try again later.", errors: "Something went wrong. Please try again later."},status: :internal_server_error
        else
            @@view.render json: {status: "failed", message: response["message"], errors: response["errors"]}, status: :bad_request
        end
    end

    

end