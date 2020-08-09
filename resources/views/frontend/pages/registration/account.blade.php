@extends('frontend/layouts/account_layout')


@section('content')


                <div class="main-content account-content">
                    <div class="section-header align-items-center justify-content-between mb-4 mb-md-5">
                        @guest
                        @else

                        <h1 class="page-title pb-0 mb-0">
                            Hello, {{ Auth::user()->name }}
                        </h1>
                        

                       @endguest
                    </div>

                    
                        

    



<div class="card main-box verify-process-box">
<div class="task-box critical-task">
    <h2 class="mb-3 mb-md-4">
        <i class="zmdi zmdi-alert-triangle"></i> Verification process (50% completed)
    </h2>
    
        <p>
            
                Level 3 &amp; 4 is not completed. To complete these steps please verify your identity <a href="/portal/veriff/auth">here</a>
            

        </p>
    
</div>
    <div class="level-list">
        <div class="level-list-item">
            <span class="level-status completed">
                <i class="zmdi zmdi-check-circle"></i>
            </span>
            <div class="level-list-item-content">
                <small class="level-title">Level 1 completed</small>
                <div class="desc-items">
                    <p>Account created</p><p>E-mail confirmed</p>
                </div>
                <div class="description-wrapper">
                    <p class="small">You can login and complete registration</p>
                </div>
            </div>
        </div>
        <div class="level-list-item">
            <span class="level-status completed">
                <i class="zmdi zmdi-check-circle"></i>
            </span>
            <div class="level-list-item-content">
                <small class="level-title">Level 2 completed</small>
                <div class="desc-items">
                    <p>Additional personal info</p><p>submitted</p><p>Phone confirmed</p>
                </div>
                <div class="description-wrapper">
                    <p class="small">You can view all projects and receive notifications</p>
                </div>
            </div>
        </div>
        <div class="level-list-item">
            <span class="level-status ">
                <i class="zmdi zmdi-circle"></i>
            </span>
            <div class="level-list-item-content">
                

                    <small class="level-title">Level 3</small>
                    <div class="desc-items">
                        <p></p><p>Verify identity</p><p></p>
                        
                            <a href="/portal/veriff/auth" class="btn btn-mini btn-lg-mob ">
                                <small class="font-weight-bold">Verify me now!</small>
                            </a>
                        
                    </div>
                

                <div class="description-wrapper">
                    <p class="small">You can now access your dashboard and add funds to your account</p>
                </div>
            </div>
        </div>
        
            <div class="level-list-item">
                <span class="level-status ">
                    <i class="zmdi zmdi-circle"></i>
                </span>
                <div class="level-list-item-content">
                    
                        <small class="level-title">Level 4</small>
                        <div class="desc-items">
                            <p></p><p>Verify bank account</p><p></p>
                            <a href="/portal/portfolio/deposit" class="btn btn-mini btn-lg-mob disabled">
                                <small class="font-weight-bold">Add funds</small>
                            </a>
                        </div>
                    

                    <div class="description-wrapper">
                        <p class="small">All doors and opportunities are open</p>
                    </div>
                </div>
            </div>
        
    </div>
</div>

                    
                    <!-- <div id="divConfirmSuccess"></div>
                    <div class="" id="accordionCollpase">
                        
<div class="card main-box transparent-mob p-0 main-separated-box openCollapse" id="divMainInfo">
    <button class="btn btn-link btn-main-collapse" type="button" data-toggle="collapse" data-target="#collapseAccountInfo" aria-expanded="false" aria-controls="collapseAccountInfo">
        My contact info
        <i class="zmdi zmdi-chevron-down"></i>
        <i class="zmdi zmdi-chevron-up"></i>
    </button>

    <div class="collapse show collapseAccountInfo" id="collapseAccountInfo" data-parent="#accordionCollpase">
        <div class="info-box-wrapper separated-item-wrapper">
            <div class="box-item">
                <h2 class="b-block d-md-none mob-title">My contact info</h2>
                <div class="box-content">
                    <div class="account-info-item">
                        <div class="row">
                            <div class="col-md-3">
                                <h5 class="accInfo-title">Name</h5>
                            </div>
                            <div class="col-md-9">
                                <div class="item-content">
                                    <p class="mb-0">
                                        <strong>
                                            
                                                Mr
                                             Umar Habib Gulfam
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="account-info-item">
                        <div class="row">
                            <div class="col-md-3">
                                <h5 class="accInfo-title">Email</h5>
                            </div>
                            <div class="col-md-9">
                                <div class="item-content">
                                    <p class="mb-0">
                                        <strong>umarhaabib98@gmail.com</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="divMain_phone" class="account-info-item account-info-item-phone">
                        <div class="row">
                            <div class="col-md-3">
                                <h5 class="accInfo-title">Phone</h5>
                            </div>
                            <div class="col-md-9" id="divEditPhone">
                                <div id="edit_account-form-phone" class="form-account-info-hide form-account-info-phone">
    <div class="form-group-wrapper">
        <div class="form-group default-form-item bmd-form-group is-filled">
            <label class="bmd-label-floating main-label"></label>
            <input type="text" class="form-control main-input" name="phone" id="phone" value="+923088684021">
        </div>
    </div>

    <div class="form-group-wrapper align-items-center">
        <div class="action-btn-wrapper">
            <button type="button" class="btn btn-mini-o btn-cancel-phone-edit">Cancel</button>
            <button type="button" onclick="submitPhoneForm()" class="btn btn-mini">Save</button>
        </div>
    </div>
</div>
<div id="divView_phone">
    

<div class="item-content">
    <button class="btn btn-action btn-action-edit btn-action-edit-phone" id="btnEditPhone">
        <i class="zmdi zmdi-edit p-0"></i>
    </button>

    
        <p class="mb-0">
            <strong>+923088684021 </strong><span class="text-muted">(default, verified)</span>
        </p>
    
</div>

</div>

<script>
    accountInfoEdit('phone');

    jQuery(document).ready(function () {
        Estatguru.initComponents()
    });

    function submitPhoneForm() {

        var phone = $('#phone').val();

        jQuery.ajax({
            url: "/portal/account/ajaxSaveAccountPhone",
            type: "POST",
            dataType: 'text',
            data: {phone: phone},
            success: function (result) {
                $("#divView_phone").html(result);
                $("#divView_phone").css("display", "block");
                $("#divMain_phone").removeClass("editable");
                $("#edit_account-form-phone").removeClass("show");
                accountInfoEdit('phone');
                Estatguru.initComponents();
            }
        });
    }

</script>
                            </div>
                        </div>
                    </div>
                    <div id="divMain_UserCountry" class="account-info-item account-info-item-UserCountry">
                        <div class="row">
                            <div class="col-md-3">
                                <h5 class="accInfo-title">Residence Country</h5>
                            </div>
                            <div class="col-md-9" id="divEditUserCountry">
                                
<div id="edit_account-form-UserCountry" class="form-account-info-hide form-account-info-UserCountry">

    <div id="divEditUserCountryOnly">
        
<div class="form-group-wrapper" id="cntrlCountry">
    <div class="form-group default-form-item padding-top-0 bmd-form-group is-filled">
        <select name="userCountry" class="form-control select2me select2-hidden-accessible select2-initialized" id="userCountry" data-select2-id="userCountry" tabindex="-1" aria-hidden="true">
<option value="">Please select...</option>
<option value="56">Afghanistan</option>
<option value="115">Albania</option>
<option value="2">Algeria</option>
<option value="116">Andorra</option>
<option value="3">Angola</option>
<option value="164">Antigua &amp; Barbuda</option>
<option value="187">Argentina</option>
<option value="117">Armenia</option>
<option value="101">Australia</option>
<option value="118">Austria</option>
<option value="119">Azerbaijan</option>
<option value="165">Bahamas</option>
<option value="57">Bahrain</option>
<option value="58">Bangladesh</option>
<option value="166">Barbados</option>
<option value="120">Belarus</option>
<option value="121">Belgium</option>
<option value="167">Belize</option>
<option value="4">Benin</option>
<option value="59">Bhutan</option>
<option value="188">Bolivia</option>
<option value="122">Bosnia and Herzegovina</option>
<option value="200">Bosnia and Herzegovina</option>
<option value="5">Botswana</option>
<option value="189">Brazil</option>
<option value="60">Brunei</option>
<option value="123">Bulgaria</option>
<option value="6">Burkina Faso</option>
<option value="7">Burundi</option>
<option value="61">Cambodia</option>
<option value="8">Cameroon</option>
<option value="168">Canada</option>
<option value="9">Cape Verde</option>
<option value="10">Central African Republic</option>
<option value="11">Chad</option>
<option value="190">Chile</option>
<option value="62">China</option>
<option value="191">Colombia</option>
<option value="12">Comoros</option>
<option value="13">Congo</option>
<option value="14">Congo Democratic Republic</option>
<option value="169">Costa Rica</option>
<option value="15">Cote d'Ivoire</option>
<option value="124">Croatia</option>
<option value="170">Cuba</option>
<option value="125">Cyprus</option>
<option value="126">Czech Republic</option>
<option value="127">Denmark</option>
<option value="16">Djibouti</option>
<option value="171">Dominica</option>
<option value="172">Dominican Republic</option>
<option value="192">Ecuador</option>
<option value="17">Egypt</option>
<option value="173">El Salvador</option>
<option value="18">Equatorial Guinea</option>
<option value="19">Eritrea</option>
<option value="1">Estonia</option>
<option value="20">Ethiopia</option>
<option value="102">Fiji</option>
<option value="128">Finland</option>
<option value="129">France</option>
<option value="201">French Polynesia</option>
<option value="21">Gabon</option>
<option value="22">Gambia</option>
<option value="130">Georgia</option>
<option value="131">Germany</option>
<option value="23">Ghana</option>
<option value="132">Greece</option>
<option value="174">Grenada</option>
<option value="175">Guatemala</option>
<option value="24">Guinea</option>
<option value="25">Guinea-Bissau</option>
<option value="193">Guyana</option>
<option value="176">Haiti</option>
<option value="177">Honduras</option>
<option value="160">Hong Kong</option>
<option value="133">Hungary</option>
<option value="134">Iceland</option>
<option value="64">India</option>
<option value="65">Indonesia</option>
<option value="66">Iran</option>
<option value="67">Iraq</option>
<option value="135">Ireland</option>
<option value="68">Israel</option>
<option value="136">Italy</option>
<option value="178">Jamaica</option>
<option value="69">Japan</option>
<option value="70">Jordan</option>
<option value="71">Kazakhstan</option>
<option value="26">Kenya</option>
<option value="103">Kiribati</option>
<option value="72">Korea North</option>
<option value="137">Kosovo</option>
<option value="199">Kosovo</option>
<option value="74">Kuwait</option>
<option value="75">Kyrgyzstan</option>
<option value="76">Laos</option>
<option value="138">Latvia</option>
<option value="77">Lebanon</option>
<option value="27">Lesotho</option>
<option value="28">Liberia</option>
<option value="29">Libya</option>
<option value="139">Liechtenstein</option>
<option value="140">Lithuania</option>
<option value="141">Luxembourg</option>
<option value="203">Macao</option>
<option value="142">Macedonia</option>
<option value="30">Madagascar</option>
<option value="31">Malawi</option>
<option value="78">Malaysia</option>
<option value="79">Maldives</option>
<option value="32">Mali</option>
<option value="143">Malta</option>
<option value="104">Marshall Islands</option>
<option value="33">Mauritania</option>
<option value="34">Mauritius</option>
<option value="179">Mexico</option>
<option value="105">Micronesia</option>
<option value="144">Moldova</option>
<option value="145">Monaco</option>
<option value="80">Mongolia</option>
<option value="146">Montenegro</option>
<option value="35">Morocco</option>
<option value="36">Mozambique</option>
<option value="81">Myanmar (Burma)</option>
<option value="37">Namibia</option>
<option value="106">Nauru</option>
<option value="82">Nepal</option>
<option value="147">Netherlands</option>
<option value="107">New Zealand</option>
<option value="180">Nicaragua</option>
<option value="38">Niger</option>
<option value="39">Nigeria</option>
<option value="148">Norway</option>
<option value="83">Oman</option>
<option value="84" selected="selected" data-select2-id="2">Pakistan</option>
<option value="108">Palau</option>
<option value="181">Panama</option>
<option value="109">Papua New Guinea</option>
<option value="194">Paraguay</option>
<option value="195">Peru</option>
<option value="85">Philippines</option>
<option value="149">Poland</option>
<option value="150">Portugal</option>
<option value="86">Qatar</option>
<option value="151">Romania</option>
<option value="87">Russia</option>
<option value="152">Russia</option>
<option value="40">Rwanda</option>
<option value="110">Samoa</option>
<option value="153">San Marino</option>
<option value="41">Sao Tome &amp; Principe</option>
<option value="88">Saudi Arabia</option>
<option value="42">Senegal</option>
<option value="154">Serbia</option>
<option value="43">Seychelles</option>
<option value="44">Sierra Leone</option>
<option value="89">Singapore</option>
<option value="155">Slovakia</option>
<option value="156">Slovenia</option>
<option value="111">Solomon Islands</option>
<option value="45">Somalia</option>
<option value="46">South Africa</option>
<option value="73">South Korea</option>
<option value="47">South Sudan</option>
<option value="48">South Sudan</option>
<option value="157">Spain</option>
<option value="90">Sri Lanka</option>
<option value="182">St. Kitts &amp; Nevis</option>
<option value="183">St. Lucia</option>
<option value="184">St. Vincent &amp; The Grenadines</option>
<option value="196">Suriname</option>
<option value="49">Swaziland</option>
<option value="158">Sweden</option>
<option value="159">Switzerland</option>
<option value="91">Syria</option>
<option value="92">Taiwan</option>
<option value="93">Tajikistan</option>
<option value="50">Tanzania</option>
<option value="94">Thailand</option>
<option value="51">Togo</option>
<option value="112">Tonga</option>
<option value="185">Trinidad &amp; Tobago</option>
<option value="52">Tunisia</option>
<option value="95">Turkey</option>
<option value="96">Turkmenistan</option>
<option value="113">Tuvalu</option>
<option value="162">UK</option>
<option value="53">Uganda</option>
<option value="161">Ukraine</option>
<option value="97">United Arab Emirates</option>
<option value="186">United States of America</option>
<option value="197">Uruguay</option>
<option value="98">Uzbekistan</option>
<option value="114">Vanuatu</option>
<option value="163">Vatican City (Holy See)</option>
<option value="198">Venezuela</option>
<option value="99">Vietnam</option>
<option value="100">Yemen</option>
<option value="54">Zambia</option>
<option value="55">Zimbabwe</option>
<option value="202">Other</option>
</select><span class="select2 select2-container select2-container--bootstrap" dir="ltr" data-select2-id="1" style="width: auto;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-userCountry-container"><span class="select2-selection__rendered" id="select2-userCountry-container" role="textbox" aria-readonly="true" title="Pakistan">Pakistan</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
        
    </div>
</div>

<div class="form-group-wrapper align-items-center mb-3 mt-3">
    <div class="action-btn-wrapper">
        <button type="button" class="btn btn-mini-o btn-cancel-UserCountry-edit">Cancel</button>
        <button type="button" onclick="submitFormUserCountry()" class="btn btn-mini">Save</button>
    </div>
</div>
<script>
    Estatguru.initComponents()
</script>
    </div>
</div>
<div id="divView_UserCountry">
    
<div class="item-content">
    <button class="btn btn-action btn-action-edit btn-action-edit-UserCountry" id="btnEditCountryMessage">
        <i class="zmdi zmdi-edit p-0"></i>
    </button>

        <p class="mb-2">
            <strong>Pakistan</strong>
        </p>
</div>

</div>
<script>
    accountInfoEdit('UserCountry');
    function submitFormUserCountry() {

        var userCountry = $("#userCountry").val();
        jQuery.ajax({
            url: "/portal/account/ajaxSaveAccountUserCountry",
            type: "POST",
            data: {userCountry: userCountry},
            success: function (result) {
                $("#divView_UserCountry").html(result);
                $("#divView_UserCountry").css("display", "block");
                $("#divMain_UserCountry").removeClass("editable");
                $("#edit_account-form-UserCountry").removeClass("show");
                accountInfoEdit('UserCountry');
                Estatguru.initComponents();
                $(".invalid").html("");
                showHideEmergency();
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                $('#divEditUserCountryOnly').html(XMLHttpRequest.responseText);
                accountInfoEdit('UserCountry');
            }
        });
    }

    function showHideEmergency() {
        if ($("#userCountry").val() === '140') {
            $("#divMain_EmergencyContact").addClass('show').removeClass('hide-control');
        } else {
            $("#divMain_EmergencyContact").addClass('hide-control').removeClass('show');
        }
    }
</script>

                            </div>
                        </div>
                    </div>
                    <div id="divMain_address" class="account-info-item account-info-item-address">
                        <div class="row">
                            <div class="col-md-3">
                                <h5 class="accInfo-title">Residence address</h5>
                            </div>
                            <div class="col-md-9" id="divEditAddress">
                                
<div id="edit_account-form-address" class="form-account-info-hide form-account-info-address">

    <div class="form-group-wrapper">
        <div class="form-group default-form-item padding-top-0 bmd-form-group is-filled">
            <input type="text" name="address" class="form-control main-input google-address pac-target-input" value="Pakistan" autocomplete="off" placeholder="" id="address">
        </div>
    </div>

    <div class="form-group-wrapper align-items-center mb-3 mt-3">
        <div class="action-btn-wrapper">
            <button type="button" class="btn btn-mini-o btn-cancel-address-edit">Cancel</button>
            <button type="button" onclick="submitForm()" class="btn btn-mini">Save</button>
        </div>
    </div>
</div>
<div id="divView_address">
    <div class="item-content">
    <button class="btn btn-action btn-action-edit btn-action-edit-address" id="btnEditAddress">
        <i class="zmdi zmdi-edit"></i>
    </button>

    <p class="mb-0" id="userAddress">
        <strong></strong>
    </p>
</div>

</div>
<script>
    accountInfoEdit('address');

    jQuery(document).ready(function () {
        Estatguru.initComponents()
    });

    function submitForm() {

        var address = localStorage.getItem('myAccountAddress');
        jQuery.ajax({
            url: "/portal/account/ajaxSaveAccountAddress",
            type: "POST",
            data: {address: address},
            success: function (result) {
                $("#divView_address").html(result);
                $("#divView_address").css("display", "block");
                $("#divMain_address").removeClass("editable");
                $("#edit_account-form-address").removeClass("show");
                accountInfoEdit('address');
                Estatguru.initComponents();
            }
        });
    }

</script>
<script type="text/javascript" src="/portal/assets/layout/googleMap-91d55f0950ec44e5271d97e1a89012f6.js"></script>

                            </div>
                        </div>
                    </div>

                    <div id="divMain_TaxResidency" class="account-info-item account-info-item-TaxResidency">
                        <div class="row">
                            <div class="col-md-3">
                                <h5 class="accInfo-title">Tax Residency</h5>
                            </div>
                            <div class="col-md-9" id="divEditTaxResidency">
                                
<div id="edit_account-form-TaxResidency" class="form-account-info-hide form-account-info-TaxResidency">

    <div id="divEditTaxResidencyOnly">
        
<span class="bmd-form-group is-filled"><div class="clearfix checkbox d-block mb-3 mr-0" id="divContactPersonCheckBox">
    <label class="mb-0">
        <input type="checkbox" value="true" name="isMyTaxResidenceCountry" id="isMyTaxResidenceCountry" checked="checked"><span class="checkbox-decorator"><span class="check"></span></span>My tax residence country is the same as residence country
    </label>
</div></span>

<div class="form-group-wrapper" id="cntrlTaxResidenceCountry" style="display: none;">
    <div class="form-group default-form-item bmd-form-group is-filled">
        <label for="taxResidenceCountry" class="bmd-label-floating main-label">
            My tax residence country
        </label>
        <select name="taxResidenceCountry" class="form-control select2me select2-hidden-accessible select2-initialized" id="taxResidenceCountry" data-select2-id="taxResidenceCountry" tabindex="-1" aria-hidden="true">
<option value="" data-select2-id="4">Please select...</option>
<option value="56">Afghanistan</option>
<option value="115">Albania</option>
<option value="2">Algeria</option>
<option value="116">Andorra</option>
<option value="3">Angola</option>
<option value="164">Antigua &amp; Barbuda</option>
<option value="187">Argentina</option>
<option value="117">Armenia</option>
<option value="101">Australia</option>
<option value="118">Austria</option>
<option value="119">Azerbaijan</option>
<option value="165">Bahamas</option>
<option value="57">Bahrain</option>
<option value="58">Bangladesh</option>
<option value="166">Barbados</option>
<option value="120">Belarus</option>
<option value="121">Belgium</option>
<option value="167">Belize</option>
<option value="4">Benin</option>
<option value="59">Bhutan</option>
<option value="188">Bolivia</option>
<option value="122">Bosnia and Herzegovina</option>
<option value="200">Bosnia and Herzegovina</option>
<option value="5">Botswana</option>
<option value="189">Brazil</option>
<option value="60">Brunei</option>
<option value="123">Bulgaria</option>
<option value="6">Burkina Faso</option>
<option value="7">Burundi</option>
<option value="61">Cambodia</option>
<option value="8">Cameroon</option>
<option value="168">Canada</option>
<option value="9">Cape Verde</option>
<option value="10">Central African Republic</option>
<option value="11">Chad</option>
<option value="190">Chile</option>
<option value="62">China</option>
<option value="191">Colombia</option>
<option value="12">Comoros</option>
<option value="13">Congo</option>
<option value="14">Congo Democratic Republic</option>
<option value="169">Costa Rica</option>
<option value="15">Cote d'Ivoire</option>
<option value="124">Croatia</option>
<option value="170">Cuba</option>
<option value="125">Cyprus</option>
<option value="126">Czech Republic</option>
<option value="127">Denmark</option>
<option value="16">Djibouti</option>
<option value="171">Dominica</option>
<option value="172">Dominican Republic</option>
<option value="192">Ecuador</option>
<option value="17">Egypt</option>
<option value="173">El Salvador</option>
<option value="18">Equatorial Guinea</option>
<option value="19">Eritrea</option>
<option value="1">Estonia</option>
<option value="20">Ethiopia</option>
<option value="102">Fiji</option>
<option value="128">Finland</option>
<option value="129">France</option>
<option value="201">French Polynesia</option>
<option value="21">Gabon</option>
<option value="22">Gambia</option>
<option value="130">Georgia</option>
<option value="131">Germany</option>
<option value="23">Ghana</option>
<option value="132">Greece</option>
<option value="174">Grenada</option>
<option value="175">Guatemala</option>
<option value="24">Guinea</option>
<option value="25">Guinea-Bissau</option>
<option value="193">Guyana</option>
<option value="176">Haiti</option>
<option value="177">Honduras</option>
<option value="160">Hong Kong</option>
<option value="133">Hungary</option>
<option value="134">Iceland</option>
<option value="64">India</option>
<option value="65">Indonesia</option>
<option value="66">Iran</option>
<option value="67">Iraq</option>
<option value="135">Ireland</option>
<option value="68">Israel</option>
<option value="136">Italy</option>
<option value="178">Jamaica</option>
<option value="69">Japan</option>
<option value="70">Jordan</option>
<option value="71">Kazakhstan</option>
<option value="26">Kenya</option>
<option value="103">Kiribati</option>
<option value="72">Korea North</option>
<option value="137">Kosovo</option>
<option value="199">Kosovo</option>
<option value="74">Kuwait</option>
<option value="75">Kyrgyzstan</option>
<option value="76">Laos</option>
<option value="138">Latvia</option>
<option value="77">Lebanon</option>
<option value="27">Lesotho</option>
<option value="28">Liberia</option>
<option value="29">Libya</option>
<option value="139">Liechtenstein</option>
<option value="140">Lithuania</option>
<option value="141">Luxembourg</option>
<option value="203">Macao</option>
<option value="142">Macedonia</option>
<option value="30">Madagascar</option>
<option value="31">Malawi</option>
<option value="78">Malaysia</option>
<option value="79">Maldives</option>
<option value="32">Mali</option>
<option value="143">Malta</option>
<option value="104">Marshall Islands</option>
<option value="33">Mauritania</option>
<option value="34">Mauritius</option>
<option value="179">Mexico</option>
<option value="105">Micronesia</option>
<option value="144">Moldova</option>
<option value="145">Monaco</option>
<option value="80">Mongolia</option>
<option value="146">Montenegro</option>
<option value="35">Morocco</option>
<option value="36">Mozambique</option>
<option value="81">Myanmar (Burma)</option>
<option value="37">Namibia</option>
<option value="106">Nauru</option>
<option value="82">Nepal</option>
<option value="147">Netherlands</option>
<option value="107">New Zealand</option>
<option value="180">Nicaragua</option>
<option value="38">Niger</option>
<option value="39">Nigeria</option>
<option value="148">Norway</option>
<option value="83">Oman</option>
<option value="84">Pakistan</option>
<option value="108">Palau</option>
<option value="181">Panama</option>
<option value="109">Papua New Guinea</option>
<option value="194">Paraguay</option>
<option value="195">Peru</option>
<option value="85">Philippines</option>
<option value="149">Poland</option>
<option value="150">Portugal</option>
<option value="86">Qatar</option>
<option value="151">Romania</option>
<option value="87">Russia</option>
<option value="152">Russia</option>
<option value="40">Rwanda</option>
<option value="110">Samoa</option>
<option value="153">San Marino</option>
<option value="41">Sao Tome &amp; Principe</option>
<option value="88">Saudi Arabia</option>
<option value="42">Senegal</option>
<option value="154">Serbia</option>
<option value="43">Seychelles</option>
<option value="44">Sierra Leone</option>
<option value="89">Singapore</option>
<option value="155">Slovakia</option>
<option value="156">Slovenia</option>
<option value="111">Solomon Islands</option>
<option value="45">Somalia</option>
<option value="46">South Africa</option>
<option value="73">South Korea</option>
<option value="47">South Sudan</option>
<option value="48">South Sudan</option>
<option value="157">Spain</option>
<option value="90">Sri Lanka</option>
<option value="182">St. Kitts &amp; Nevis</option>
<option value="183">St. Lucia</option>
<option value="184">St. Vincent &amp; The Grenadines</option>
<option value="196">Suriname</option>
<option value="49">Swaziland</option>
<option value="158">Sweden</option>
<option value="159">Switzerland</option>
<option value="91">Syria</option>
<option value="92">Taiwan</option>
<option value="93">Tajikistan</option>
<option value="50">Tanzania</option>
<option value="94">Thailand</option>
<option value="51">Togo</option>
<option value="112">Tonga</option>
<option value="185">Trinidad &amp; Tobago</option>
<option value="52">Tunisia</option>
<option value="95">Turkey</option>
<option value="96">Turkmenistan</option>
<option value="113">Tuvalu</option>
<option value="162">UK</option>
<option value="53">Uganda</option>
<option value="161">Ukraine</option>
<option value="97">United Arab Emirates</option>
<option value="186">United States of America</option>
<option value="197">Uruguay</option>
<option value="98">Uzbekistan</option>
<option value="114">Vanuatu</option>
<option value="163">Vatican City (Holy See)</option>
<option value="198">Venezuela</option>
<option value="99">Vietnam</option>
<option value="100">Yemen</option>
<option value="54">Zambia</option>
<option value="55">Zimbabwe</option>
<option value="202">Other</option>
</select><span class="select2 select2-container select2-container--bootstrap" dir="ltr" data-select2-id="3" style="width: auto;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-taxResidenceCountry-container"><span class="select2-selection__rendered" id="select2-taxResidenceCountry-container" role="textbox" aria-readonly="true" title="Please select...">Please select...</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
        
    </div>
</div>

<div class="form-group-wrapper align-items-center mb-3 mt-3">
    <div class="action-btn-wrapper">
        <button type="button" class="btn btn-mini-o btn-cancel-TaxResidency-edit">Cancel</button>
        <button type="button" onclick="submitFormTaxResidency()" class="btn btn-mini">Save</button>
    </div>
</div>
<script>
     Estatguru.initComponents()
</script>
    </div>
</div>
<div id="divView_TaxResidency">
    


<div class="item-content">
    <button class="btn btn-action btn-action-edit btn-action-edit-TaxResidency" id="btnEditTaxResidencyMessage">
        <i class="zmdi zmdi-edit p-0"></i>
    </button>

    
        <p class="mb-2">
            <strong>My tax residence country is the same as residence country</strong>
        </p>
    
</div>

</div>
<script>
    accountInfoEdit('TaxResidency');
    showHideControl('isMyTaxResidenceCountry', 'cntrlTaxResidenceCountry');
    function submitFormTaxResidency() {

        var isMyTaxResidenceCountry = $('#isMyTaxResidenceCountry').prop('checked') ;
        var taxResidenceCountry = $("#taxResidenceCountry").val();
        jQuery.ajax({
            url: "/portal/account/ajaxSaveAccountTaxResidency",
            type: "POST",
            data: {isMyTaxResidenceCountry: isMyTaxResidenceCountry,taxResidenceCountry:taxResidenceCountry },
            success: function (result) {
                $("#divView_TaxResidency").html(result);
                $("#divView_TaxResidency").css("display", "block");
                $("#divMain_TaxResidency").removeClass("editable");
                $("#edit_account-form-TaxResidency").removeClass("show");
                accountInfoEdit('TaxResidency');
                Estatguru.initComponents();
                $(".invalid").html("");
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                $('#divEditTaxResidencyOnly').html(XMLHttpRequest.responseText);
                accountInfoEdit('TaxResidency');
                showHideControl('isMyTaxResidenceCountry', 'cntrlTaxResidenceCountry');
            }
        });
    }

</script>
<script type="text/javascript" src="/portal/assets/layout/googleMap-91d55f0950ec44e5271d97e1a89012f6.js"></script>

                            </div>
                        </div>
                    </div>

                    <div id="divMain_ContactAddress" class="account-info-item account-info-item-ContactAddress">
                        <div class="row">
                            <div class="col-md-3">
                                <h5 class="accInfo-title">Contact address</h5>
                            </div>
                            <div class="col-md-9" id="divEditContactAddress">
                                
<div id="edit_account-form-ContactAddress" class="form-account-info-hide form-account-info-ContactAddress">

    <div id="divEditContactAddressCommandOnly">
        <div class="form-group pt-0 bmd-form-group is-filled">
    <div class="clearfix checkbox pt-2">
        <label class="mb-0">
            <input type="checkbox" checked="checked" value="true" name="isMyContAddressSame" id="isMyContAddressSame"><span class="checkbox-decorator"><span class="check"></span></span>My contact address is the same as residence address
        </label>
    </div>
</div>
<div class="form-group bmd-form-group" id="divMyContAddressSame" style="display: none">
    <label for="contactAddress" class="bmd-label-floating main-label">
        My contact address
    </label>
    <input type="text" name="contactAddress" class="form-control main-input google-address pac-target-input" autocomplete="off" placeholder="" value="" id="contactAddress">
    


</div>

<div class="form-group-wrapper align-items-center mb-3 mt-3">
    <div class="action-btn-wrapper">
        <button type="button" class="btn btn-mini-o btn-cancel-ContactAddress-edit">Cancel</button>
        <button type="button" onclick="submitFormContactAddress()" class="btn btn-mini">Save</button>
    </div>
</div>
<script type="text/javascript" src="/portal/assets/layout/googleMap-91d55f0950ec44e5271d97e1a89012f6.js"></script>

    </div>

</div>
<div id="divView_ContactAddress">
    
<div class="item-content">
    <button class="btn btn-action btn-action-edit btn-action-edit-ContactAddress" id="btnEditContactAddress">
        <i class="zmdi zmdi-edit p-0"></i>
    </button>

    
        <p class="mb-2">
            <strong>My contact address is the same as residence address</strong>
        </p>
    
</div>

</div>
<script>
    accountInfoEdit('ContactAddress');
    showHideControl('isMyContAddressSame', 'divMyContAddressSame');
    jQuery(document).ready(function () {
        Estatguru.initComponents()
    });

    function submitFormContactAddress() {

        var isMyContAddressSame = $('#isMyContAddressSame').prop('checked') ;
        var contactAddress = $('#contactAddress').val();

        jQuery.ajax({
            url: "/portal/account/ajaxSaveContactAddress",
            type: "POST",
            data: {isMyContAddressSame: isMyContAddressSame, contactAddress:contactAddress},
            success: function (result) {
                $("#divView_ContactAddress").html(result);
                $("#divView_ContactAddress").css("display", "block");
                $("#divMain_ContactAddress").removeClass("editable");
                $("#edit_account-form-ContactAddress").removeClass("show");
                accountInfoEdit('ContactAddress');
                showHideControl('isMyContAddressSame', 'divMyContAddressSame');
                Estatguru.initComponents();
                $(".invalid").html("");
            }, error:function(XMLHttpRequest,textStatus,errorThrown){
                $('#divEditContactAddressCommandOnly').html(XMLHttpRequest.responseText);
                accountInfoEdit('ContactAddress');
                showHideControl('isMyContAddressSame', 'divMyContAddressSame');
            }
        });
    }

</script>

                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>
            <div class="box-item secondary-item">
                <div class="item-content">
                    <i class="icon icon-contact1"></i>
                    <h3>Manage it all in one place</h3>
                    <p class="text-muted">This is your personal account page. You can use it to keep your details updated, check that everything is correct, and invite shared users to your account.</p>
                </div>
            </div>
        </div>
    </div>
    
</div>
                        <div id="divPremiumBox">
                            


                        </div>

                        
                            <div id="userProfile">
                                
                                    <div class="card main-box transparent-mob p-0 main-separated-box">
    <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapseInvProfileView" aria-expanded="false" aria-controls="collapseInvProfileView">
        <span>Investor profile</span>
        <i class="zmdi zmdi-chevron-down"></i>
        <i class="zmdi zmdi-chevron-up"></i>
    </button>
    <div class="collapse collapseInvProfileView" id="collapseInvProfileView" data-parent="#accordionCollpase">
        <div class="info-box-wrapper separated-item-wrapper">
            <div class="box-item">
                <h2 class="b-block d-md-none mob-title">Investor profile</h2>
                <div class="box-content">
    <h6 class="mb-4">Investors additional information</h6>

    <p class="text-muted mb-0">Purpose of investment</p>

    <p class="mb-4">
        
            Investment into secured loans
        
    </p>

    <p class="text-muted mb-0">Planned investment (per month)</p>


    <p class="mb-0">
        

            Up to € 1000
        

    </p>
    <small class="text-muted mb-4 d-block">Amount of money planned to be invested in loans</small>

    <p class="text-muted mb-0">Occupation</p>

    <p class="mb-4">
        
            Employee
        
    </p>

    <p class="text-muted mb-0">Average monthly Income</p>

    <p class="mb-4">
        
            Up to € 1,000
        
    </p>

    <p class="text-muted mb-0">Main source of funds</p>

    <p class="mb-4">
        
            
        
            
        
            
                Pension, &nbsp;
            
        
            
        
            
        
            
        
            
        
            
        
            
        
    </p>
    <h6 class="mb-2">Beneficial owners information</h6>

    <p class="text-muted mb-0">I hereby confirm that I am the actual owner (beneficiary) of funds in accounts.</p>

    <p class="mb-3">Yes</p>
    
    <h6 class="mb-2">Politically exposed persons (PEPs)</h6>

    <p class="text-muted mb-0"></p><p>Do or did (no more than one year ago) you or your immediate family members or close associates have an important public position in your jurisdiction, in European Union, international or foreign institutions?</p><p>(Immediate family members – the spouse, the person from the registered partnership, parents, brothers, sisters, grandparents, grandchildren, children and children’s spouses, children cohabitants. close associate is a personwith whom you have a joint business or maintain other professional or business relations.)</p><p></p>

    <p class="mb-4">Yes
        
            <br>
            
                
                    I myself, &nbsp;
                
            
                
            
                
            

        
    </p>

    <div class="form-group-item">
        <h6>Statements and approvals</h6>

        <p class="mb-4">I, the undersigned, hereby certify that: the information provided on this questionnaire is true, complete and without any omissions reflects the actual situation. EstateGuru provided will not be used for illegal activities(including but not limited to money laundering and financing of terrorism). I undertake to inform estateguru in writing about any changes of the above mentioned information.</p>

        <span class="bmd-form-group is-filled"><div class="clearfix checkbox d-block mb-2">
            <label class="float-left">
                <input type="checkbox" checked="" disabled="" name="statementsApprovals" id="statementsApprovals" value="true"><span class="checkbox-decorator"><span class="check"></span></span>I hereby confirm the authenticity of the above data
            </label>
        </div></span>
        

    </div>

    
        <div class="text-right edit-profile-link-wrapper mb-3">
            <a onclick="openCompanyProfileEditForm()" tabindex="1" class="not-href">Edit investor profile<i class="zmdi zmdi-edit"></i></a>
        </div>
    
</div>

<script>
    function openCompanyProfileEditForm() {
        jQuery.ajax({
            url: "/portal/account/ajaxOpenUserProfileEditForm",
            type: "POST",
            success: function (data) {
                $('#userProfile').html(data);
                Estatguru.initComponents();
                $("#btnCollapseUserProfile").click();
            }
        });
    }
</script>
            </div>
            <div class="box-item secondary-item" id="viewUserSecondaryItem">
                <div class="item-content">
                    <i class="icon icon-assignment-24"></i>
                    <h3>Let's make it legal! </h3>
                    <p class="text-muted">
                        To be compliant with laws on anti-money laundering and "know your client" principles please provide following information. </p><p>Note: records provided by the customer are confidential and are not made public to third parties without the customer’s written consent, except for the statutory cases of governmental authorities, when the data must be disclosed to the competent authorities or persons.</p>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</div>
                                

                            </div>
                        
                        
<div class="card main-box transparent-mob separated-row-item p-0">
    <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapseAccountInfoAdd" aria-expanded="false" aria-controls="collapseAccountInfoAdd">
        My identity verification
        <i class="zmdi zmdi-chevron-down"></i>
        <i class="zmdi zmdi-chevron-up"></i>
    </button>
    <div class="collapse collapseAccountInfoAdd" id="collapseAccountInfoAdd" data-parent="#accordionCollpase">
        <div class="info-box-wrapper pb-0 pb-md-2">
            <table class="table data-table responsive-table ordered account-table account-table-add">
                <thead>
                <tr>
                    <th>Document type, number</th>
                    <th>Document expiry date</th>
                    <th>Picture of document</th>
                    <th>ID-code</th>
                    <th>Date of birth</th>
                    <th>Citizenship</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr class="pb-1 pb-md-0">
                    <td class="td-main order_0">-</td>
                    <td class="mob-none">
                        -
                    </td>
                    <td class="mob-none">
                        -
                    </td>
                    <td data-label="ID-code:">-</td>
                    <td class="mob-none">
                        -
                    </td>
                    <td class="mob-none">
                        -
                    </td>
                    
                    <td class="status text-status pb-mob-1 NOT_VERIFIED" data-label-mob2="Not Verified:">
                        <span data-toggle="tooltip" data-placement="right" title="" data-original-title="Not Verified" class="tooltips-initialized">
                            Not Verified
                        </span>
                    </td>
                </tr>
                
                    <tr class="pb-1 pb-md-0">
                        <td class="order_0"></td>
                        <td class="order_1" colspan="6">
                            <a href="/portal/veriff/auth" class="btn btn-mini pull-right">
                                <small class="font-weight-bold">Verify me now!</small>
                            </a>

                        </td>
                    </tr>
                
                </tbody>
            </table>
        </div>
    </div>
</div>

                        <div id="div_showAddedCompany">
                            
                                
<div class="card main-box transparent-mob main-separated-box p-0" id="divCollapseInfoCompany">
    <button class="btn btn-link btn-main-collapse collapsed" id="btnCollapseInfoCompany" type="button" data-toggle="collapse" data-target="#collapseInfoCompany" aria-expanded="false" aria-controls="collapseInfoCompany">
        Company info
        <i class="zmdi zmdi-chevron-down"></i>
        <i class="zmdi zmdi-chevron-up"></i>
    </button>

    <div class="collapse collapseAccountInfo" id="collapseInfoCompany" data-parent="#accordionCollpase">
         <div class="info-box-wrapper separated-item-wrapper">

              <div class="box-item">
                  <h2 class="b-block d-md-none mob-title">My contact info</h2>
                     <div class="box-content">
                          
                             <div id="div_newCompany">
                                 <div class="btn-add-wrapper">
    <a onclick="ajaxNewCompanyForm()" tabindex="1" class="btn-add-item" style="cursor: pointer">
        <i class="zmdi zmdi-plus-circle-o"></i>
        Add company
    </a>
</div>
                             </div>
                         
                     </div>

                </div>

                    <div class="box-item secondary-item">
                        <div class="item-content" style="margin-top:-13px;">
                            <i class="icon icon-assignment-24"></i>

                            <h3>Company</h3>

                            <p class="text-muted">Company general information and documents regarding representation rights.</p>
                        </div>
                    </div>

            </div>

    </div>

</div>


<script>
    function ajaxEditCompanyAddress() {
        jQuery.ajax({
            url: "/portal/account/ajaxEditCompanyAddress",
            type: "POST",
            success: function (data) {
                $('#div_companyAddress').html(data);
                Estatguru.initAjax();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function ajaxEditCompanyRightOfRepresentation() {
        var companyCountry = $("#companyCountry").val();
        var isInvestor =$("#isInvestor").val();
        var rightOfRepresent =$("#rightRepresentation").val();
        jQuery.ajax({
            url: "/portal/account/ajaxEditCompanyRightOfRepresentation",
            type: "POST",
            data: {
                companyCountry:companyCountry
            },
            success: function (data) {
                $('#div_rightOfRepresentation').html(data);
                if((isInvestor === "true") && companyCountry && rightOfRepresent && !(companyCountry === "1" && rightOfRepresent === "MEMBER_MANAGEMENT")) {
                    $("#showUploadMessage").attr("style", "display: block;");
                }else{
                    $("#showUploadMessage").attr("style", "display: none;");
                }
                Estatguru.initAjax();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function ajaxEditCompanyCountry(){
        jQuery.ajax({
            url: "/portal/account/ajaxEditCompanyCountry",
            type: "POST",
            success: function (data) {
                $('#div_companyCountry').html(data);
                Estatguru.initAjax();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function ajaxEditCompanyRow(companyId) {
        var rowId = "trRow_" + companyId;
        jQuery.ajax({
            url: "/portal/account/ajaxEditCompanyRow",
            type: "POST",
            success: function (data) {
                $('#' + rowId).replaceWith(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function ajaxLoadCompanyTable() {
        jQuery.ajax({
            url: "/portal/account/ajaxLoadCompanyTable",
            type: "POST",
            success: function (data) {
                $('#divCompanyTable').html(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function ajaxLoadCompanyAddress() {
        jQuery.ajax({
            url: "/portal/account/ajaxLoadCompanyAddress",
            type: "POST",
            success: function (data) {
                $('#div_companyAddress').html(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function ajaxLoadCompanyRightOfRepresentation() {
        jQuery.ajax({
            url: "/portal/account/ajaxLoadCompanyRightOfRepresentation",
            type: "POST",
            success: function (data) {
                $('#div_rightOfRepresentation').html(data);
                Estatguru.initAjax();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function ajaxLoadCompanyCountry(){
        jQuery.ajax({
            url: "/portal/account/ajaxLoadCompanyCountry",
            type: "POST",
            success: function (data) {
                $('#div_companyCountry').html(data);
                Estatguru.initAjax();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function ajaxNewCompanyForm() {
        jQuery.ajax({
            url: "/portal/account/ajaxNewCompanyForm",
            type: "POST",
            success: function (data) {
                $('#div_newCompany').html(data);
                Estatguru.initAjax();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#div_newCompany').html(XMLHttpRequest.responseText);
                Estatguru.initAjax();
            }
        });
    }

    jQuery(document).ready(function () {
        Estatguru.initComponents()

    });

    function submitCompanyAddress() {
        var jsonAddress = localStorage.getItem('myAccountAddress');
        var address = $('#countryAddress').val();


        jQuery.ajax({
            url: "/portal/account/ajaxSaveCompanyAddress",
            type: "POST",
            data: {
                jsonAddress: jsonAddress,
                address: address
            },
            success: function (result) {
                $('#div_companyAddress').html(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#div_companyAddress').html(XMLHttpRequest.responseText);
            }
        });
    }

    function submitCompanyRightOfRepresentation() {
        var formData = new FormData();
        var rightRepresentation = $('#rightRepresentation').val();
        formData.append('rightRepresentation', rightRepresentation);
        var isNewCompany = $('#isNewCompany').val();
        formData.append('isNewCompany', isNewCompany);
        var companyId = '';
        formData.append('companyId', companyId);
        var companyCountry = $('#companyCountry').val();
        formData.append('companyCountry', companyCountry);
        var isInvestor = $('#isInvestor').val();
        if((isInvestor === "true") && rightRepresentation && (!companyCountry ||  !(companyCountry === "1" && rightRepresentation === "MEMBER_MANAGEMENT"))){
        formData.append('memberOfBoardFile', $('#memberOfBoardFile')[0].files[0]);
        }
        jQuery.ajax({
            url: "/portal/account/ajaxSaveRightOfRepresentation",
            type: "POST",
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            success: function (result) {
                $('#div_rightOfRepresentation').html(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#div_rightOfRepresentation').html(XMLHttpRequest.responseText);
                Estatguru.init();
            }
        });
    }

    function submitCompanyCountry() {
        var companyCountry = $('#companyCountry').val();
        var companyId = '';
        jQuery.ajax({
            url: "/portal/account/ajaxSaveCompanyCountry",
            type: "POST",
            data: {
                companyCountry: companyCountry,
                companyId:companyId
            },

            success: function (result) {
                $('#div_companyCountry').html(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#div_companyCountry').html(XMLHttpRequest.responseText);
                Estatguru.init();
            }
        });
    }

    function isShowMemberOfBoardUploadFile(){
        var url = $("#urlAjaxCheckCountryAndRight").val();
        var isNewCompany = $('#isNewCompany').val();
        var companyCountry = $("#companyCountry").val();
        var rightOfRepresent =$("#rightRepresentation").val();
        var prevRrightOfRepresent  =$("#prevRightRepresentation").val();
        var memberOfBoardFileName = "";
        if(prevRrightOfRepresent ===rightOfRepresent ) {
             memberOfBoardFileName = $("#prevMemberOfBoardFileName").val();
        }

        var isPrivateInvestorUser =$("#isPrivateInvestor").val();
        var isInvestor =$("#isInvestor").val();
        $('#memberOfBoardFileHidden-error').hide();
        jQuery.ajax({
            url: url,
            type: "POST",
            data: {
                rightOfRepresent:rightOfRepresent,
                companyCountry:companyCountry,
                memberOfBoardFileName:memberOfBoardFileName,
                isPrivateInvestorUser:isPrivateInvestorUser,
                isInvestor:isInvestor,
                isNewCompany:isNewCompany
            },
            dataType: 'text',
            success: function (result) {
                $("#memberOfBoardUpload").html(result);
                if (result) {
                    $("#showUploadMessage").attr("style", "display: block;");
                } else {
                    $("#showUploadMessage").attr("style", "display: none;");
                }
            },
            error: function(request, status, error) {
                return false;
            }
        });
    }

</script>





                            
                        </div>
                        <div id="userCompanyProfile">
                            
                        </div>
                        
                            <div id="userAppropriateProfile">
                                
                                    
                                        <div class="card main-box transparent-mob p-0 main-separated-box " id="mainDivUserAppropraiteProfileView">
    <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" id="btnCollapseAppropraiteProfileView" data-target="#collapseAppropraiteProfileView" aria-expanded="false" aria-controls="collapseAppropraiteProfileView">
        <span>Appropriateness Questionnaire </span>
        <i class="zmdi zmdi-chevron-down"></i>
        <i class="zmdi zmdi-chevron-up"></i>
    </button>
    <div class="collapse collapseAppropraiteProfile" id="collapseAppropraiteProfileView" data-parent="#accordionCollpase">
        <div class="info-box-wrapper separated-item-wrapper">
            <div class="box-item">
                <h2 class="b-block d-md-none mob-title">Appropriateness Questionnaire</h2>
                <div class="box-content" id="userAppropraiteProfileMainForm">
                    
                    
<div class="form-group-item" id="viewAppropriateUserDiv">
    
    <div class="mb-3">
        

        <div class="form-group bmd-form-group is-filled">

            <h6 class="title pt-2 mb-3">1.  Are you currently or have you previously been employed as a professional in the Financial Markets/Services industry?</h6>

       <div class="radio">
        <label class="mb-0">
            <input type="radio" name="isWorkingFinMarket" value="true" disabled="disabled"><span class="bmd-radio"></span>
            <span class="ml-1">Yes</span>
        </label>

        <label class="mb-0 ml-3">
            <input type="radio" name="isWorkingFinMarket" value="false" checked="checked" disabled="disabled"><span class="bmd-radio"></span> <span class="ml-1">No</span>
        </label>

        

    </div>
        </div>

    </div>

    <div class="form-group bmd-form-group is-filled">
        <div class="mb-2">
            <h6 class="title pt-2 mb-4">2.  What's the current net worth of your whole investor portfolio?</h6>

            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="investorDescribe" id="investorDescribe" value="LESS_THAN_100" class="ml-1" checked="checked" disabled="disabled"><span class="bmd-radio"></span>
                        <span class="ml-1">  Less than €100k</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="investorDescribe" id="investorDescribe" value="FROM_100_TO_1M" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                        <span class="ml-1">  €100k-€1 million</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="investorDescribe" id="investorDescribe" value="MORE_THAN_1M" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                        <span class="ml-1">  over €1 million</span>
                    </label>
                </div>
            
            
        </div>
    </div>
    <div class="form-group bmd-form-group is-filled">
        <div class="mb-2">
            <h6 class="title pt-2 mb-4">3.  What is your main goal when investing through the Estateguru investment platform?</h6>

            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="investmentMainGoal" id="investmentMainGoal" value="KNOW_INVESTING_IN_GENERAL" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                        <span class="ml-1">  Using Estateguru to learn about investing in general and the risks associated with it</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="investmentMainGoal" id="investmentMainGoal" value="MAXIMIZE_INDIVIDUAL_RETURNS" class="ml-1" checked="checked" disabled="disabled"><span class="bmd-radio"></span>
                        <span class="ml-1">  I'm looking to maximize the individual returns of my investments</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="investmentMainGoal" id="investmentMainGoal" value="IMVESTMENT_INSTRUMENT_WITH_EXPOSURE" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                        <span class="ml-1">  I'm looking for an investment instrument with exposure to real estate without the need to manage the properties on my own</span>
                    </label>
                </div>
            
                <div class="radio">
                    <label class="mb-0 pt-3">
                        <input type="radio" name="investmentMainGoal" id="investmentMainGoal" value="IMVESTMENT_INSTRUMENT_LOWER_RISKS" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                        <span class="ml-1">  I'm looking for an investment instrument to lower risks through diversifying my portfolio</span>
                    </label>
                </div>
            
            
        </div>
    </div>

    <div class="form-group bmd-form-group is-filled">
        <div class="mb-2">
            <h6 class="title pt-2 mb-4">4.  Please list investment instruments that you are currently using or have been using in the past:</h6>

            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="1" checked="checked" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        Public stocks
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="2" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        Equity
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="3" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        Bonds
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="4" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        Direct loans
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="5" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        P2P financing
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="6" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        Real Estate
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="7" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        Savings products
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="8" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        Real Estate crowdfunding
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="9" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        Equity crowdfunding
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="10" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        REITs
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="investmentInstrumentList" id="investmentInstrumentList" value="11" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        Index funds
                    </label>
                </div>
            
            
        </div>
    </div>

    <div class="form-group bmd-form-group is-filled">

        <h6 class="title pt-2 mb-3">5.  What is the ratio of property-backed real estate loans in your portfolio?</h6>

        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="backedRealEstateLoanRatio" id="backedRealEstateLoanRatio" value="VALUE_UP_TO_10" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  Less than 10% of my total investment portfolio</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="backedRealEstateLoanRatio" id="backedRealEstateLoanRatio" value="VALUE_10_TO_50" class="ml-1" checked="checked" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  10-50% of my total investment portfolio</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="backedRealEstateLoanRatio" id="backedRealEstateLoanRatio" value="VALUE_50_TO_90" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  50-90% of my total investment portfolio</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="backedRealEstateLoanRatio" id="backedRealEstateLoanRatio" value="VALUE_MORE_90" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  over 90% of my total investment portfolio</span>
                </label>
            </div>
        
        
    </div>

    <div class="form-group bmd-form-group is-filled">
        <div class="mb-2">
            <h6 class="title pt-2 mb-4">6.  If a borrower takes a €100 000 Full Bullet loan for 12 months with 10% annual interest rate, which of the following statements are true?</h6>

            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="totalPayBackAmountList" id="totalPayBackAmountList" value="1" checked="checked" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        The total amount of money the borrower has to pay back is €120000
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="totalPayBackAmountList" id="totalPayBackAmountList" value="2" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        The total amount of money the borrower has to pay back is €110000
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="totalPayBackAmountList" id="totalPayBackAmountList" value="3" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        The borrower pays back the principal in equal amounts every month
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="totalPayBackAmountList" id="totalPayBackAmountList" value="4" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        The borrower pays back interest payments each month
                    </label>
                </div>
            
            
        </div>
    </div>


    <div class="form-group bmd-form-group is-filled">

        <h6 class="title pt-2 mb-3">7.  In the context of Estateguru’s financing platform choose the correct meaning of LTV (loan to value):</h6>

        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="ltvMeaning" id="ltvMeaning" value="BORROWER_LIFETIME_VALUE" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  Loan to value of the borrower for each individual platform investor</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="ltvMeaning" id="ltvMeaning" value="INVESTOR_LIFETIME_VALUE" class="ml-1" checked="checked" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  Lifetime value of an average investor for Estateguru</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="ltvMeaning" id="ltvMeaning" value="LOAN_VALUE_AGAINST_COLLATERAL_VALUE" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  Loan to value for each loan means how big a loan is given out against the value of the collateral</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="ltvMeaning" id="ltvMeaning" value="LEVERAGE_TRUST_VALUE" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  Amount of all the loans (secured and non-secured) the borrower has taken minus the value of the collateral property</span>
                </label>
            </div>
        
        
    </div>
    <div class="form-group bmd-form-group is-filled">
        <div class="mb-2">
            <h6 class="title pt-2 mb-4">8.   Investors invest in a loan with an LTV of 75%. The loan goes into default and Estateguru sells the collateral object 20% cheaper than initially valued in the report. Choose the statements below that are correct about this loan.</h6>

            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="defaultLoanFundsList" id="defaultLoanFundsList" value="1" checked="checked" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        The funds received from the sales are still enough to cover the loan obligations for the investors
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="defaultLoanFundsList" id="defaultLoanFundsList" value="2" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        Selling a collateral object always comes with additional costs. In this case, the investor may lose some capital or/and some of the earned interest
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="defaultLoanFundsList" id="defaultLoanFundsList" value="3" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        It doesn’t matter how much the sales price changes from the initial price because the initial LTV is small enough to protect the investors
                    </label>
                </div>
            
                <div class="clearfix checkbox mb-2">
                    <label class="float-left">
                        <input type="checkbox" name="defaultLoanFundsList" id="defaultLoanFundsList" value="4" disabled="disabled"><span class="checkbox-decorator"><span class="check"></span></span>
                        LTV should never be over 50%
                    </label>
                </div>
            
            
        </div>
    </div>
    <div class="form-group bmd-form-group is-filled">

        <h6 class="title pt-2 mb-3">9.   Which of the following potential portfolio strategies would be the best to minimize the business and financial risks across your portfolio related to each individual borrower?</h6>

        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="riskMinimizeStrategy" id="riskMinimizeStrategy" value="DIVIDE_PORTFOLIO_MAX_10_DIFFERENT_INVESTMENT" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  You should divide your whole portfolio between 3-5 different investments</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="riskMinimizeStrategy" id="riskMinimizeStrategy" value="MORE_MONEY_IN_ONE_INVESTMENT" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  The more money you put into one investment the fewer investments you have and the fewer risks you will carry related to borrowers' business and financial risks</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="riskMinimizeStrategy" id="riskMinimizeStrategy" value="DIVERSIFY_INVESTMENTS" class="ml-1" checked="checked" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  You should diversify the investments in your portfolio. It's said that having your portfolio divided between 25 investments is a good sign of well-diversified portfolio</span>
                </label>
            </div>
        
        
    </div>

    <div class="form-group bmd-form-group is-filled">

        <h6 class="title pt-2 mb-3">10.   The holder of a first ranking mortgage is the lender that has which right to the proceeds from an enforced sale of the collateral property?</h6>

        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="firstRankingMortgageHolder" id="firstRankingMortgageHolder" value="FIRST_RANK" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  Second (the owner has always first)</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="firstRankingMortgageHolder" id="firstRankingMortgageHolder" value="SECOND_RANK" class="ml-1" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  First</span>
                </label>
            </div>
        
            <div class="radio">
                <label class="mb-0 pt-3">
                    <input type="radio" name="firstRankingMortgageHolder" id="firstRankingMortgageHolder" value="THIRD_RANK" class="ml-1" checked="checked" disabled="disabled"><span class="bmd-radio"></span>
                    <span class="ml-1">  Third (the owner and state always come first)</span>
                </label>
            </div>
        
        
    </div>

</div>

<script>
    $(document).ready(function () {
        $("#viewAppropriateUserDiv :input").attr("disabled", true);
    });


</script>

                </div>
            </div>
            <div class="box-item secondary-item">
                <div class="item-content">
                    <i class="icon icon-assignment-24"></i>
                    <h3>Let's make it legal! </h3>
                    <p class="text-muted">
                        To be compliant with laws on anti-money laundering and "know your client" principles please provide following information. Note: records provided by the customer are confidential and are not made public to third parties withoutthe customer’s written consent, except for the statutory cases of governmental authorities, when the data must be disclosed to the competent authorities or persons.</p>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</div>
                                    
                                
                            </div>
                        

                        
<div class="card main-box transparent-mob separated-row-item p-0" id="jointAccountPart">
    <button class="btn btn-link btn-main-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapseInfoBank" aria-expanded="false" aria-controls="collapseInfoBank">
        Bank account
        <i class="zmdi zmdi-chevron-down"></i>
        <i class="zmdi zmdi-chevron-up"></i>
    </button>

    <div class="collapse collapseInfoBank" id="collapseInfoBank" data-parent="#accordionCollpase">
        <div class="info-box-wrapper pb-0 pb-md-2">
            <table class="table primary-table ordered mob-size2 table-full-height-img">
                <thead>
                <tr>
                    <th>Iban</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        </div>
    </div>
</div>
 -->
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop