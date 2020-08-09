@extends('frontend/layouts/account_layout')


@section('content')


@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
<div class="onboard-wrapper">
    <div class="container main-steps-container">
        <ul class="list-unstyled main-steps-list">
            <li class="success">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Sign up</span>
            </li>

            <li class="success">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Verify email</span>
            </li>

            <li class="current">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Contact info</span>
            </li>

            <li class="">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Identity verification</span>
            </li>

            <li class="">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Investor profile</span>
            </li>

            <li class="">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Appropriateness Questionnaire</span>
            </li>
        </ul>
    </div>
    <h1 class="text-center mt-4 mb-0">
        Contact Info
    </h1>

    <div class="onboarding-tab-wrapper" data-select2-id="224">
         <ul class="nav nav-tabs onboarding-tab" id="onboardReg" role="tablist">
            <li class="nav-item">
                <a class="nav-link"  href="{{URL::to('')}}/tetenter/private_investor">
                    Private Investor
                    <div class="ripple-container"></div>
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link active show"  href="{{URL::to('')}}/tetenter/company_representer">
                    Company representative
                    <div class="ripple-container"></div>
                </a>
            </li>
        </ul>

       

        <form action="{{URL::to('')}}/tetenter/company_representer" method="post" class="onboarding-form" enctype="multipart/form-data">
          

            <div class="tab-content" id="registerTab">
                <div class="tab-pane fade active show" id="private-investor" role="tabpanel" aria-labelledby="onboard-reg-tab">
                    <div class="row">
                        <div class="col-4 col-md-3">
                            <div class="form-group">
                                <label for="gender" class="bmd-label-floating">
                                    Title
                                </label>
                                <select name="gender" id="gender" class="form-control">
                                    <option value="MALE">Mr</option>
                                    <option value="FEMALE">Mrs</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-8 col-md-9">
                            <div class="form-group bmd-form-group">
                                <label for="firstName" class="bmd-label-floating main-label">
                                    First name
                                </label>

                                <input type="text" name="fname" class="form-control main-input" />
                            </div>
                        </div>
                    </div>

                    <div class="form-group bmd-form-group">
                        <label for="lastName" class="bmd-label-floating main-label">
                            Last name
                        </label>
                        <input type="text" name="lname" class="form-control main-input" />
                    </div>

                    <div class="form-group bmd-form-group is-filled">
                        <label for="userCountry" class="bmd-label-floating main-label">
                            Residence Country
                        </label>
                        <select name="country" class="form-control">
                            <option value="">Please select...</option>
                            <option value="+93">Afghanistan</option>
                            <option value="+355">Albania</option>
                            <option value="+213">Algeria</option>
                            <option value="+376">Andorra</option>
                            <option value="+244">Angola</option>
                            <option value="+1268">Antigua &amp; Barbuda</option>
                            <option value="+54">Argentina</option>
                            <option value="+374">Armenia</option>
                            <option value="+61">Australia</option>
                            <option value="+43">Austria</option>
                            <option value="+994">Azerbaijan</option>
                            <option value="+1242">Bahamas</option>
                            <option value="+973">Bahrain</option>
                            <option value="+880">Bangladesh</option>
                            <option value="+1246">Barbados</option>
                            <option value="+375">Belarus</option>
                            <option value="+32">Belgium</option>
                            <option value="+501">Belize</option>
                            <option value="+229">Benin</option>
                            <option value="+975">Bhutan</option>
                            <option value="+591">Bolivia</option>
                            <option value="+387">Bosnia and Herzegovina</option>
                            <option value="+387">Bosnia and Herzegovina</option>
                            <option value="+267">Botswana</option>
                            <option value="+55">Brazil</option>
                            <option value="+673">Brunei</option>
                            <option value="+359">Bulgaria</option>
                            <option value="+226">Burkina Faso</option>
                            <option value="+257">Burundi</option>
                            <option value="+855">Cambodia</option>
                            <option value="+237">Cameroon</option>
                            <option value="+1">Canada</option>
                            <option value="+238">Cape Verde</option>
                            <option value="+236">Central African Republic</option>
                            <option value="+235">Chad</option>
                            <option value="+56">Chile</option>
                            <option value="+86">China</option>
                            <option value="+57">Colombia</option>
                            <option value="+269">Comoros</option>
                            <option value="+242">Congo</option>
                            <option value="+243">Congo Democratic Republic</option>
                            <option value="+506">Costa Rica</option>
                            <option value="">Cote d'Ivoire</option>
                            <option value="+385">Croatia</option>
                            <option value="+53">Cuba</option>
                            <option value="+357">Cyprus</option>
                            <option value="+420">Czech Republic</option>
                            <option value="+45">Denmark</option>
                            <option value="+253">Djibouti</option>
                            <option value="+1767">Dominica</option>
                            <option value="+1809">Dominican Republic</option>
                            <option value="+593">Ecuador</option>
                            <option value="+20">Egypt</option>
                            <option value="+503">El Salvador</option>
                            <option value="+240">Equatorial Guinea</option>
                            <option value="+291">Eritrea</option>
                            <option value="+372">Estonia</option>
                            <option value="+251">Ethiopia</option>
                            <option value="+679">Fiji</option>
                            <option value="+358">Finland</option>
                            <option value="+33">France</option>
                            <option value="+689">French Polynesia</option>
                            <option value="+241">Gabon</option>
                            <option value="+220">Gambia</option>
                            <option value="+995">Georgia</option>
                            <option value="+49">Germany</option>
                            <option value="+233">Ghana</option>
                            <option value="+30">Greece</option>
                            <option value="+1473">Grenada</option>
                            <option value="+502">Guatemala</option>
                            <option value="+224">Guinea</option>
                            <option value="+245">Guinea-Bissau</option>
                            <option value="+595">Guyana</option>
                            <option value="+509">Haiti</option>
                            <option value="+504">Honduras</option>
                            <option value="+852">Hong Kong</option>
                            <option value="+36">Hungary</option>
                            <option value="+354">Iceland</option>
                            <option value="+91">India</option>
                            <option value="+62">Indonesia</option>
                            <option value="+98">Iran</option>
                            <option value="+964">Iraq</option>
                            <option value="+353">Ireland</option>
                            <option value="+972">Israel</option>
                            <option value="+39">Italy</option>
                            <option value="+1876">Jamaica</option>
                            <option value="+81">Japan</option>
                            <option value="+962">Jordan</option>
                            <option value="+77">Kazakhstan</option>
                            <option value="+254">Kenya</option>
                            <option value="+686">Kiribati</option>
                            <option value="+850">Korea North</option>
                            <option value="+383">Kosovo</option>
                            <option value="+383">Kosovo</option>
                            <option value="+965">Kuwait</option>
                            <option value="+996">Kyrgyzstan</option>
                            <option value="+856">Laos</option>
                            <option value="+371">Latvia</option>
                            <option value="+961">Lebanon</option>
                            <option value="+266">Lesotho</option>
                            <option value="+231">Liberia</option>
                            <option value="+218">Libya</option>
                            <option value="+423">Liechtenstein</option>
                            <option value="+370">Lithuania</option>
                            <option value="+352">Luxembourg</option>
                            <option value="+853">Macao</option>
                            <option value="+389">Macedonia</option>
                            <option value="+261">Madagascar</option>
                            <option value="+265">Malawi</option>
                            <option value="+60">Malaysia</option>
                            <option value="+960">Maldives</option>
                            <option value="+223">Mali</option>
                            <option value="+356">Malta</option>
                            <option value="+692">Marshall Islands</option>
                            <option value="+222">Mauritania</option>
                            <option value="+230">Mauritius</option>
                            <option value="+52">Mexico</option>
                            <option value="+691">Micronesia</option>
                            <option value="+373">Moldova</option>
                            <option value="+377">Monaco</option>
                            <option value="+976">Mongolia</option>
                            <option value="+382">Montenegro</option>
                            <option value="+212">Morocco</option>
                            <option value="">Mozambique</option>
                            <option value="+95">Myanmar (Burma)</option>
                            <option value="+264">Namibia</option>
                            <option value="+674">Nauru</option>
                            <option value="+977">Nepal</option>
                            <option value="+31">Netherlands</option>
                            <option value="+64">New Zealand</option>
                            <option value="+505">Nicaragua</option>
                            <option value="+227">Niger</option>
                            <option value="+234">Nigeria</option>
                            <option value="+47">Norway</option>
                            <option value="+968">Oman</option>
                            <option value="+92">Pakistan</option>
                            <option value="+680">Palau</option>
                            <option value="+507">Panama</option>
                            <option value="+675">Papua New Guinea</option>
                            <option value="+595">Paraguay</option>
                            <option value="+51">Peru</option>
                            <option value="+63">Philippines</option>
                            <option value="+48">Poland</option>
                            <option value="+351">Portugal</option>
                            <option value="+974">Qatar</option>
                            <option value="+40">Romania</option>
                            <option value="+7">Russia</option>
                            <option value="+7">Russia</option>
                            <option value="+250">Rwanda</option>
                            <option value="+685">Samoa</option>
                            <option value="+378">San Marino</option>
                            <option value="">Sao Tome &amp; Principe</option>
                            <option value="+966">Saudi Arabia</option>
                            <option value="+221">Senegal</option>
                            <option value="+381">Serbia</option>
                            <option value="+248">Seychelles</option>
                            <option value="+232">Sierra Leone</option>
                            <option value="+65">Singapore</option>
                            <option value="+421">Slovakia</option>
                            <option value="+386">Slovenia</option>
                            <option value="+677">Solomon Islands</option>
                            <option value="">Somalia</option>
                            <option value="+27">South Africa</option>
                            <option value="+82">South Korea</option>
                            <option value="+211">South Sudan</option>
                            <option value="+249">South Sudan</option>
                            <option value="+34">Spain</option>
                            <option value="+94">Sri Lanka</option>
                            <option value="+1869">St. Kitts &amp; Nevis</option>
                            <option value="">St. Lucia</option>
                            <option value="">St. Vincent &amp; The Grenadines</option>
                            <option value="+597">Suriname</option>
                            <option value="+268">Swaziland</option>
                            <option value="+46">Sweden</option>
                            <option value="+41">Switzerland</option>
                            <option value="+963">Syria</option>
                            <option value="+886">Taiwan</option>
                            <option value="+992">Tajikistan</option>
                            <option value="+255">Tanzania</option>
                            <option value="+66">Thailand</option>
                            <option value="+228">Togo</option>
                            <option value="+676">Tonga</option>
                            <option value="+1868">Trinidad &amp; Tobago</option>
                            <option value="+216">Tunisia</option>
                            <option value="+90">Turkey</option>
                            <option value="+993">Turkmenistan</option>
                            <option value="+688">Tuvalu</option>
                            <option value="+44">UK</option>
                            <option value="+256">Uganda</option>
                            <option value="+380">Ukraine</option>
                            <option value="+971">United Arab Emirates</option>
                            <option value="+1">United States of America</option>
                            <option value="+598">Uruguay</option>
                            <option value="+998">Uzbekistan</option>
                            <option value="+678">Vanuatu</option>
                            <option value="">Vatican City (Holy See)</option>
                            <option value="+58">Venezuela</option>
                            <option value="+84">Vietnam</option>
                            <option value="+967">Yemen</option>
                            <option value="+260">Zambia</option>
                            <option value="+263">Zimbabwe</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div class="form-group bmd-form-group">
                        <label for="residenceAddress" class="bmd-label-floating main-label">
                            Residence address
                        </label>
                        <input type="text" name="residencea_address" class="form-control" placeholder="" />
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group bmd-form-group mobile-number">
                                <label class="bmd-label-floating main-label" style="padding-left: 40px;" id="lblUserCountry" for="mobileNumber">Mobile number</label>
                                <input type="text" class="form-control main-input" id="mobileNumber" style="padding-left: 40px;" name="mobile" maxlength="12" value="" autocomplete="off" />
                            </div>
                        </div>

                        <!--    <div class="col-sm-6">
                    <div class="form-group bmd-form-group is-filled">
                        <div class="clearfix checkbox pt-2">
                            <label class="float-left">
                                <input type="checkbox" name="twoStepAuth" value="true"><span class="checkbox-decorator"><span class="check"></span></span>
                                Enable 2-step auth
                            </label>
                        </div>
                        <button type="button" class="btn-action btn-action-primary input-right-btn tooltips-initialized" data-toggle="tooltip" data-placement="top" title="" data-original-title="Two-step verification is a process that involves two authentication methods during investment.">
                            <i class="zmdi zmdi-info-outline"></i>
                        </button>
                    </div>
                </div> -->
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group bmd-form-group">
                                <label for="signUpPromotionCode" class="bmd-label-floating main-label">
                                    Referral Code
                                </label>
                                <input type="text" name="referal_code" class="form-control main-input" value="" autocomplete="nope" id="signUpPromotionCode" />
                                <button
                                    type="button"
                                    class="btn-action btn-action-primary input-right-btn tooltips-initialized"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Using referral code can earn 0.5% from investment"
                                >
                                    <i class="zmdi zmdi-info-outline"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <input type="hidden" name="isPrivateInvestor" id="isPrivateInvestor" value="true" />
                    <input type="hidden" name="isInvestor" id="isInvestor" value="true" />

                    <div class="form-group" id="divDocumentMemberOfBoardError" style="display: none;">
                        <div id="divDocumentMemberOfBoard"></div>
                        <input type="hidden" name="memberOfBoardFileHidden" value="" id="memberOfBoardFileHidden" />
                    </div>
                    <div class="section-describtion" id="divUploadDocInfo" style="display: none;">
                        <p>* Parts of our verification process are conducted manually. In order to speed up this process, we recommend uploading documents in English.</p>
                    </div>
                </div>
            </div>

            <div id="companyContainer" style="">
                <h4 class="pt-4"><strong>Company info</strong></h4>

                <div class="form-group bmd-form-group">
                    <label for="company_name" class="bmd-label-floating main-label">
                        Company name
                    </label>
                    <input type="text" name="company_name" class="form-control main-input" autocomplete="off"  />
                </div>

                <div class="form-group bmd-form-group">
                    <label for="company_registery" class="bmd-label-floating main-label">
                        Company registry code
                    </label>
                    <input type="text" name="company_registery" class="form-control main-input"  />
                </div>
                <div class="form-group bmd-form-group is-filled">
                    <label for="companyCountry" class="bmd-label-floating main-label">
                        Company Country
                    </label>
                    <select name="company_country" id="" class="form-control" >
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
                    </select>
                </div>
                <div class="form-group bmd-form-group">
                    <label for="companyAddress" class="bmd-label-floating main-label">
                        Company address
                    </label>
                    <input type="text" name="company_address" class="form-control main-input google-address pac-target-input" autocomplete="off" placeholder="" value=""  />
                </div>
                <h4 class="pt-4 pb-2" style="color: rgba(3, 19, 39, 0.38);"><strong>Please upload the following documents (documents in English will be verified faster, but other languages are acceptable) </strong></h4>
                <div class="form-group">
                    <label class="bmd-label-floating main-label file-label company-file-label">
                        <span id="lblArticlesAssociationFile" class="file-label-text form-control project-name">
                            Articles of Association
                        </span>

                        <input
                            type="file"
                            name="article_file"
                            id="articlesAssociationFile"
                            multiple="multiple"
                            data-max-size="2048"
                            accept="image/*,.doc, .docx,.pdf"
                            class="form-control main-input text-center"
                            value=""
                            onchange="fillArticlesAssociationFile(value)"
                        />

                        <span class="btn-mini-o text-center content-width">Browse</span>
                    </label>
                    <button
                        type="button"
                        class="btn-action btn-action-primary input-right-btn company-doc-info tooltips-initialized"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="The signed Articles of Association of the company (or any other official document showing the company’s beneficial owner from the Commercial Court Registrar’s Office, or a letter signed by the company’s legal representative if the capital structure is not stated in the Articles of Association)"
                    >
                        <i class="zmdi zmdi-info-outline"></i>
                    </button>
                </div>
                <div class="form-group">
                    <label class="bmd-label-floating main-label file-label company-file-label">
                        <span id="lblActivityCompany" class="file-label-text form-control project-name">
                            Extract from Company Registry
                        </span>

                        <input type="file" name="companyregistery_file" multiple="multiple" data-max-size="2048" accept="image/*,.doc, .docx,.pdf" class="form-control main-input text-center" value="" />

                        <span class="btn-mini-o text-center content-width">Browse</span>
                    </label>
                    <button
                        type="button"
                        class="btn-action btn-action-primary input-right-btn company-doc-info tooltips-initialized"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Must be for the company holding the payment account and preferably less than three months old"
                    >
                        <i class="zmdi zmdi-info-outline"></i>
                    </button>
                </div>

                <div class="form-group bmd-form-group is-filled">
                    <label for="rightRepresentation" class="bmd-label-floating main-label">Right of Representation</label>
                    <select class="form-control" name="right_representation">
                        <option value="">Please select...</option>
                        <option value="MEMBER_MANAGEMENT">Member of the Management Board</option>
                        <option value="POWER_ATTORNEY">Power of Attorney</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
            </div>

            <div class="section-describtion" id="divUploadDocInfo" style="display: none;">
                <p>* Parts of our verification process are conducted manually. In order to speed up this process, we recommend uploading documents in English.</p>
            </div>

            <div class="form-group pt-5">
                <a class="btn btn-cta-o btn-xl-mob mb-3">Come back later</a>
                

               <button type="submit" class="btn btn-cta-o btn-xl-mob mb-3">Submit</button>
    
            </div>
        </form>
    </div>
</div>



@stop