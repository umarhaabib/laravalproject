 @extends('frontend/layouts/sidebar')

    @section('content')


                   <div class="main-content pricelist-content">
                        <div class="action-content-heading mb-4">
                            <h1 class="page-title pb-0 mb-0">
                				Price List                				<span class="title-date pl-0">Updated: 11/06/2020</span>
                			</h1>
                                                    </div>
                                                        <div class="main-table-title">
                                    <span>General services</span>
                                    <span>Price (€)</span>
                                </div>
                                <div class="accordion" id="accordionPrice-1">
                                                                                <div class="card">
                                                <div class="card-header" id="heading-1-1">
                                                    <h5 class="mb-0">
                                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-1-1" aria-expanded="true" aria-controls="collapse-1-1">
                                                            User Account                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapse-1-1" class="collapse show" aria-labelledby="heading-1-1" data-parent="#accordionPrice">
                                                    <div class="card-body">
                                                        <table class="table">
                                                            <tbody>
                                                                                                                                <tr>
                                                                        <td>Account management fee</td>
                                                                        <td>-</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Portal Operator’s service fee⁷</td>
                                                                        <td>1€</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>LHV Bank Link Service fee¹</td>
                                                                        <td>According to service provider pricing</td>
                                                                    </tr>
                                                                                                                                </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                                                            </div>
                                                                <div class="main-table-title">
                                    <span>Investing</span>
                                    <span>Price (€)</span>
                                </div>
                                <div class="accordion" id="accordionPrice-2">
                                                                                <div class="card">
                                                <div class="card-header" id="heading-2-1">
                                                    <h5 class="mb-0">
                                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-2-1" aria-expanded="true" aria-controls="collapse-2-1">
                                                            Primary Market                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapse-2-1" class="collapse show" aria-labelledby="heading-2-1" data-parent="#accordionPrice">
                                                    <div class="card-body">
                                                        <table class="table">
                                                            <tbody>
                                                                                                                                <tr>
                                                                        <td>Making an investment</td>
                                                                        <td>-</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Contract fee</td>
                                                                        <td>-</td>
                                                                    </tr>
                                                                                                                                </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                                                                        <div class="card">
                                                <div class="card-header" id="heading-2-2">
                                                    <h5 class="mb-0">
                                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-2-2" aria-expanded="true" aria-controls="collapse-2-2">
                                                            Secondary Market                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapse-2-2" class="collapse show" aria-labelledby="heading-2-2" data-parent="#accordionPrice">
                                                    <div class="card-body">
                                                        <table class="table">
                                                            <tbody>
                                                                                                                                <tr>
                                                                        <td>Service fee for seller</td>
                                                                        <td>2% of the transaction amount</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Buyer fee</td>
                                                                        <td>-</td>
                                                                    </tr>
                                                                                                                                </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                                                            </div>
                                                                <div class="main-table-title">
                                    <span>Borrowing</span>
                                    <span>Price (€)</span>
                                </div>
                                <div class="accordion" id="accordionPrice-3">
                                                                                <div class="card">
                                                <div class="card-header" id="heading-3-1">
                                                    <h5 class="mb-0">
                                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-3-1" aria-expanded="true" aria-controls="collapse-3-1">
                                                            Loan Application                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapse-3-1" class="collapse show" aria-labelledby="heading-3-1" data-parent="#accordionPrice">
                                                    <div class="card-body">
                                                        <table class="table">
                                                            <tbody>
                                                                                                                                <tr>
                                                                        <td>Intermediation fee²</td>
                                                                        <td>2.5%-4%</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Administration fee (annual)³</td>
                                                                        <td>0-2%</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Notary fees from establishing the mortgage⁴</td>
                                                                        <td>According to notary services pricelist</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Establishing the mortgage by EstateGuru Security Agent</td>
                                                                        <td>250 + VAT</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Releasing the mortgage by EstateGuru Security Agent</td>
                                                                        <td>100 + VAT</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Extending loan Period up to 6 months</td>
                                                                        <td>Up to 1% from the loan amount, min €250</td>
                                                                    </tr>
                                                                                                                                </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                                                                        <div class="card">
                                                <div class="card-header" id="heading-3-2">
                                                    <h5 class="mb-0">
                                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-3-2" aria-expanded="true" aria-controls="collapse-3-2">
                                                            Overdue payments                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapse-3-2" class="collapse show" aria-labelledby="heading-3-2" data-parent="#accordionPrice">
                                                    <div class="card-body">
                                                        <table class="table">
                                                            <tbody>
                                                                                                                                <tr>
                                                                        <td>Formal notice fee</td>
                                                                        <td>According to local service provider pricing</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>EstateGuru Security Realisation Fee</td>
                                                                        <td>5% of principal loan amount</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Security agent fee</td>
                                                                        <td>According to local service provider pricing</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Bailiff fee⁵</td>
                                                                        <td>According to local service provider pricing</td>
                                                                    </tr>
                                                                                                                                        <tr>
                                                                        <td>Overdue payment notice⁶</td>
                                                                        <td>20€ (according to EC directive 2011/7/EU)</td>
                                                                    </tr>
                                                                                                                                </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                                                            </div>
                                                                    <div class="prices-text"><p>&nbsp;</p>
<p>¹ &#8211; LHV Bank Link service fee &#8211; it is a fee in the amount of up to 10 euros for administrating transactions on the platform. The precise fee amount is indicated in the deposit/withdrawal section of the platform.</p>
<p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;The platform reserves the right to propose a specific fee amount considering the loan amount, loan term, repayment schedule, liquidity of the asset and borrower's background. Fx, for a loan amount of €1 000 000 with an LTV 50%, loan term of 12 months and monthly interest payment with principal paid at the end and strong financial background of the borrower, the intermediation fee can be proposed 2.5% from the loan amount. For a loan amount of €50 000, LTV 69%, collateral situated in the secondary city, full bullet payment schedule, the intermediation fee could be prosed 4% of the loan amount.&quot;}" data-sheets-userformat="{&quot;2&quot;:769,&quot;3&quot;:{&quot;1&quot;:0},&quot;11&quot;:4,&quot;12&quot;:0}">² &#8211; The platform reserves the right to propose a specific fee amount considering the loan amount, loan term, repayment schedule, liquidity of the asset and borrower&#8217;s background. Fx, for a loan amount of €1 000 000 with an LTV 50%, a loan term of 12 months and monthly interest payment with the principal paid at the end and strong financial background of the borrower, the intermediation fee can be proposed 2.5% from the loan amount. For a loan amount of €50 000, LTV 69%, collateral situated in the secondary city, full bullet payment schedule, the intermediation fee could be prosed 4% of the loan amount.</span></p>
<p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Fx. The platform reserves the right to propose a specific administration fee amount considering the loan amount, loan term, repayment schedule, liquidity of the asset and borrower's background. Fx, for a loan mount of €1 000 000 with an LTV 50%, loan term of 12 months and monthly interest payment with principal paid at the end and strong financial background of the borrower, the administration fee can be proposed 0.5% annually, paid according the the interest payment schedule. For a loan amount of €50 000, LTV 69%, collateral situated in the secondary city, full bullet payment schedule, the annual administration fee fee could be prosed 0%, due to specifics of the loan repayment (full bullet) and proposed intermediation fee.&quot;}" data-sheets-userformat="{&quot;2&quot;:6979,&quot;3&quot;:{&quot;1&quot;:0},&quot;4&quot;:[null,2,16777215],&quot;9&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0,&quot;14&quot;:[null,2,0],&quot;15&quot;:&quot;Arial&quot;}">³ &#8211; Fx. The platform reserves the right to propose a specific administration fee amount considering the loan amount, loan term, repayment schedule, liquidity of the asset and borrower&#8217;s background. Fx, for a loan amount of €1 000 000 with an LTV 50%, a loan term of 12 months and monthly interest payment with the principal paid at the end and strong financial background of the borrower, the administration fee can be proposed 0.5% annually, paid according to the interest payment schedule. For a loan amount of €50 000, LTV 69%, collateral situated in the secondary city, full bullet payment schedule, the annual administration fee could be prosed 0%, due to specifics of the loan repayment (full bullet) and proposed intermediation fee.</span></p>
<p>⁴ &#8211; Read more about Estonian Notary Fees Act <a href="https://www.riigiteataja.ee/akt/114032011047" target="_blank" rel="noopener">https://www.riigiteataja.ee/akt/114032011047</a></p>
<p>⁵ &#8211; Estonia: <a href="https://www.riigiteataja.ee/en/eli/517012019001/consolide" target="_blank" rel="noopener">https://www.riigiteataja.ee/en/eli/517012019001/consolide</a>; Latvia: <a href="http://likumi.lv/doc.php?id=250209" target="_blank" rel="noopener">http://likumi.lv/doc.php?id=250209</a>; Lithuania: <a href="https://www.antstoliurumai.lt/index.php?id=1989" target="_blank" rel="noopener">https://www.antstoliurumai.lt/index.php?id=1989</a></p>
<p><sup>⁶</sup> &#8211; We charge up to 40€ (2*20€) reminder fees in accordance of EC directive 2011/7/EU article 6 and local legislation where the mentioned EC directive has been implemented into.</p>
<p>⁷ &#8211; Portal Operator’s service fee is calculated and charged every time money is withdrawn from the virtual account by the investor</p>
</div>
                                                    </div>
                </div>
            </div>
        </div>


        @stop