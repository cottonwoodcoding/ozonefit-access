class ApiController < ApplicationController
  skip_before_filter :verify_authenticty_token
  before_filter :authorized
  protect_from_forgery with: :null_session

  respond_to :json
  respond_to :js

  private

    def authorized
      render nothing: :true, status: 401 unless current_user
    end

    def failed_response
      { message: 'Unauthorized' }
    end

    def convert_date(subject_date, format_in = "%m/%d/%Y", format_out = "%b %d %Y")
      unless subject_date.blank?
        date = Date.strptime(subject_date, format_in)
        subject_date = date.strftime(format_out)
      end
      subject_date
    end

    def unprocessable(error)
      respond_to do |format|
        format.json { render json: { message: error.message }, status: 422 }
      end
    end
end
