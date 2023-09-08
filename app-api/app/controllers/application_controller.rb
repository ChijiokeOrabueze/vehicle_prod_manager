class ApplicationController < ActionController::API



    def handle_response(response, message="", statusCode=400)

        status = {
            400 => :bad_request,
            413 => :unprocessable_entity,
            500 => :internal_server_error,
        }
        
        if response["success"]
            render json: {status: "success", message: message, data: response["data"]}, status: :ok
        elsif response["internal_error"]
            render json: {status: "error", message: "Something went wrong. Please try again later.", errors: "Something went wrong. Please try again later."},status: :internal_server_error
        else
            render json: {status: "failed", message: response["message"], errors: response["errors"]}, status: status[statusCode] || :internal_server_error
        end
    end

end
