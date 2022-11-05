require "test_helper"

class AuthControllerTest < ActionDispatch::IntegrationTest
  test "should get working" do
    get auth_working_url
    assert_response :success
  end
end
